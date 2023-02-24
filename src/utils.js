export const silentUpdate = (url) =>
	window.history.replaceState(null, null, url);
