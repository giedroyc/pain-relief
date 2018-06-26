const vscode = require('vscode');
const cp = require('copy-paste');

function activate(context) {

    console.log('Congratulations, your extension "pain-relief" is now active!');

    let copyAsFrom = vscode.commands.registerCommand('extension.copyAsFrom', function () {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let selection = editor.selection;
            let selectedText = editor.document.getText(selection);

            let workspace = vscode.workspace;
            let path = workspace.rootPath ? workspace.asRelativePath(editor.document.uri) : editor.document.fileName;
            let fromPath = 'from ' + path.replace('/','.').slice(0,-3) + ' import ';
            if (selectedText.length > 0) {
                fromPath += selectedText;
            }
            cp.copy(fromPath);
        } else {
            vscode.window.showInformationMessage("Open a file first to copy its path");
        }
    });

    context.subscriptions.push([copyAsFrom]);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;