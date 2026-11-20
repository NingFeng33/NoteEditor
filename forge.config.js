module.exports = {
    packagerConfig: {
        name: 'JOB NOTE EDITOR',
        executableName: 'JOB NOTE EDITOR',
        asar: true
    },

    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'job_note_editor',
                setupExe: 'JOB NOTE EDITOR Setup.exe'
            }
        }
    ]
};