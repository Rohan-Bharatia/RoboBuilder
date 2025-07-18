export interface CodeFile {
    name: string;
    path: string;
    content: string;
    language: string;
}

export async function generateRobotCode(config: any): CodeFile[] {
    const files: CodeFile[] = [];

    await generateBuildFiles(config, files);
    switch (config.language) {
        case 'Java':
            await generateJavaFiles(config, files);
            break;
        case 'C++':
            await generateCppFiles(config, files);
            break;
        case 'Python':
            await generatePythonFiles(config, files);
            break;
    }

    return files;
}

async function generateJavaFiles(config: any, files: any) {
    //
}

async function generateCppFiles(config: any, files: any) {
    //
}

async function generatePythonFiles(config: any, files: any) {
    //
}

async function generateBuildFiles(config: any, files: any) {
    files.push({
        name: 'launch.json',
        path: '.vscode/launch.json',
        content: ``,
        language: 'JSON',
    });
    files.push({
        name: 'settings.json',
        path: '.vscode/settings.json',
        content: ``,
        language: 'JSON',
    });
    files.push({
        name: 'wplilib_preferences.json',
        path: '.wpilib/wpilib_preferences.json',
        content: ``,
        language: 'JSON',
    });
    files.push({
        name: '.gitignore',
        path: '.gitignore',
        content: ``,
        language: 'git',
    });
    files.push({
        name: 'WPILib-License.md',
        path: 'WPILib-License.md',
        content: ``,
        language: 'Markdown',
    });
    files.push({
        name: 'RoboBuilder-License.txt',
        path: 'RoboBuilder-License.txt',
        content: ``,
        language: 'Text',
    });
}
