'use client';
import styles from './page.module.css';
import { getLink } from '@/actions';
import { FormEvent, useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(e: FormEvent) {
    e.preventDefault();

    if (!url) return;
    setError('');
    setDownloadLink('');
    setIsLoading(true);

    const data = await getLink(url);
    setIsLoading(false);
    if (!data) {
      setError('Something went wrong');
      return;
    }
    const { link, error } = data;
    if (error) {
      setError(error);
      return;
    }
    setDownloadLink(link);
  }
  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <label className={styles.label} htmlFor="input">
          Enter songsterr URL:
        </label>
        <input
          className={styles.input}
          type="text"
          id="input"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className={styles.btn}>Generate download link</button>
        {downloadLink && (
          <a target="_blank" className={styles.link} href={downloadLink}>
            {downloadLink}
          </a>
        )}
        {isLoading && <span className={styles.loader}></span>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}
