const vscode = require('vscode');

function activate(context) {

    console.log('Congratulations, your extension "pain-relief" is now active!');

    let copyAsFrom = vscode.commands.registerCommand('extension.copyAsFrom', async () => {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let selection = editor.selection;
            let selectedText = editor.document.getText(selection);

            let workspace = vscode.workspace;
            let path = workspace.rootPath ? workspace.asRelativePath(editor.document.uri) : editor.document.fileName;
            let fromPath = 'from ' + path.replace(/\//g,'.').slice(0,-3) + ' import ';
            if (selectedText.length > 0) {
                fromPath += selectedText;
            }
            await vscode.env.clipboard.writeText(fromPath);
        } else {
            vscode.window.showInformationMessage("Open a file first to copy its path");
        }
    });

    let copyPyBreakpoint = vscode.commands.registerCommand('extension.copyPyBreakpoint', async () => {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let lineNumber = editor.selection.active.line + 1;
            let path = editor.document.uri.path
            let breakpointPath = 'b ' + path.slice(0,-3) + ':' + lineNumber;            
            await vscode.env.clipboard.writeText(breakpointPath);
        } else {
            vscode.window.showInformationMessage("Open a file first to copy its path");
        }
    });

    context.subscriptions.push([copyAsFrom, copyPyBreakpoint]);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
