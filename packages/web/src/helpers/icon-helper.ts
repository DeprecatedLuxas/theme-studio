export default class IconHelper {
  static getIcon(name: string, ext: string = "", isFolder: boolean = false) {
    
    
    if (isFolder) {
      return `/api/icons/folder/${name}`;
    }

    return `/api/icons/file/${name}/${ext}`;
  }
}
