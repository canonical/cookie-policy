let offlineMode = false;

export const setOfflineMode = (isOffline) => {
  offlineMode = isOffline;
};

export const isOfflineMode = () => {
  return offlineMode;
}