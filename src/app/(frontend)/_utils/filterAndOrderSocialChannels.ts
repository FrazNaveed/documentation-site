export interface ISocialChannel {
  title: string;
  url: string;
  followerCount: number | null;
}

export interface IGlobalSocialChannels {
  [key: string]: ISocialChannel;
}

export default function filterAndOrderSocialChannels(
  globalSocialChannels: IGlobalSocialChannels,
  selectSocialChannels: string[] | null | undefined,
): Array<ISocialChannel & { key: string }> {
  if (!selectSocialChannels) return []

  return selectSocialChannels
    .map((key) => {
      const channel = globalSocialChannels[key]
      if (channel) {
        return {
          key,
          ...channel,
        }
      }
      return null
    })
    .filter((channel): channel is ISocialChannel & { key: string } => channel !== null)
}
