# Major Changes
- [ ] Add better config system (Dynamic & kinda the way vscode does it with extensions)
- [ ] Improve performance
- [ ] Add a better way to handle theme registry
    > Maybe something like having the default files, and load them on server
    > then create small files where the settings defined by vscode is set.
    > This way, we can probably make it more easy to use presets?
- [ ] Add popover component.
- [ ] Fix VariableGroup, to only allow one group open at a time.
- [ ] Look into adding a code analysis to the content, so we can tell what is what
- [ ] Add a better color picker to theme editor (Requires Popover component)
- [ ] Clean up tailwind config (Look into tailwind-classnames and tailwind jit engine).
- [ ] VSCode Extension to test themes in a working environment.
- [ ] Add LocalStorageFormatWarning when localStorage doesn't have the correct format as the current save format.  
~~Add suppot for multiple themes in local editor.~~
  > Will remove the hole purpose of creating a account.
- [ ] Add keybinds to local
- [ ] Add command palette
  - [ ] Commands
    - [ ] Like the browser (Select and Element in browser to highlight)
    - [ ] Scope Inspector ([VSCode Docs](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#scope-inspector))
- [ ] Fix Java Api, to handle presets, icons and clone from repository.
  - [x] Presets
  - [ ] Icons
    - [ ] Custom Icons
    - [ ] Normal Icons
  - [ ] Clone
    - [ ] GitHub
    - [ ] GitLab
 
- [ ] Add browsing page, to browse themes.
- [ ] Complete the toVSCFormat function.
- [ ] Add api to themes
  - [ ] Get every theme 
  - [ ] Get specific theme with id
