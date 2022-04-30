import { useEffect, useState } from 'react';

export default function useDocumentTitle( initTitle: string ){
  const [title, setTitle] = useState(initTitle);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return setTitle;
}