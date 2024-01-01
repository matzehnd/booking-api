export const getFilePersistanceHandler =
  (fileUrl: string) => async (events: Array<unknown>) => {
    await Bun.write(fileUrl, JSON.stringify(events)).then(() => undefined);
  };
