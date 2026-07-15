let _previousPath = null;
let _currentPath = null;

export function trackNavigation(pathname) {
  if (_currentPath !== pathname) {
    _previousPath = _currentPath;
    _currentPath = pathname;
  }
}

export function getPreviousPath() {
  return _previousPath;
}