import { useState, useEffect } from 'react';

export interface RobotProps {
    teamNumber?: number;
    teamName?: string;
    robotName?: string;
    roboRIOVersion?: number;
    // ...
    createdAt?: string;
    lastModified?: string;
};

let globalConfig: RobotProps | null = null;
let configListeners: Array<(config: RobotProps | null) => void> = [];

function notifyListensers() {
    configListeners.forEach(listeners => listener(globalConfog));
}

export function useConfig() {
    const [config, setConfig] = useState<RobotProps | null>(globalConfig);

    useEffect(() => {
        const listener = (newConfig: RobotProps | null) => {
            setConfig(newConfig);
        };

        configListeners.push(listener);

        return () => {
            configListeners = configListeners.filter(l => l !== listener);
        };
    }, []);

    return config;
}

export async function loadFile(file: File): Promise<RobotProps | null> {
    try {
        const content = await file.text();
        const config  = JSON.parse(content) as RobotProps;

        if (typeof config !== 'object' || config === null)
            throw new Error('Invalid configuration file format');

        config.lastModified = new Date().toISOString();

        globalConfig = config;
        notifyListeners();

        console.log(`Configuration loaded successfully ${config}`);
        return config;
    }
    catch(error) {
        console.error(`Error loading configuration file: ${error}`);
        throw error;
    }
}

export function readFile(): RobotProps | null {
    return globalConfig;
};

export function writeFile(key: string, value: any) {
    if (!globalConfig) {
        globalConfig = {
            teamNumber: 0,
            teamName: 'Unknown',
            robotName: 'Unknown',
            roboRIOVersion: 0,
            // ...
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
        };
    }

    const keys = key.split('.');
    let current: any = globalConfig;

    for (let i = 0; i < keys.length - 1; ++i) {
        const currentKey = keys[i];

        if (!(currentKey in current))
            current[currentKey] = {};
        current = current[currentKey];
    }

    const finalKey = keys[keys.length - 1];
    current[finalKey] = value;

    globalConfig.lastModified = new Date().toISOString();

    notifyListeners();
    console.log(`Configuration updated: ${key} = ${value}`);
}

export function exportFile(filename: string) {
    if (!globalConfig) {
        console.error('No configuration file to export');
        return;
    }

    const json = JSON.stringify(globalConfig, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename || 'robot.rbtconf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    console.log('Configuration exported successfully');
}
