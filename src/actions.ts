'use server';

const XML_SONG_INFO =
  'https://www.songsterr.com/a/ra/player/songrevision/__ID__.xml';

export const getLink = async (url: string) => {
  try {
    let error = '';
    let link = '';
    const resp = await fetch(url);

    if (!resp.ok) {
      error = 'Cant parse URL';
      return { link, error };
    }
    const html = await resp.text();

    link = html.split('"source":"')[1].split('"')[0].replace(/u002F/g, '');

    return { link, error };
  } catch (e) {
    console.log(e);
  }
};
