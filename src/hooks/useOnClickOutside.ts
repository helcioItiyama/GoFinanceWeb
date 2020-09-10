import { useEffect } from 'react';

export function useOnClickOutside(ref: React.RefObject<HTMLElement>, callback:() =>void) {
  const handleClick = (event:MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  const handleKeyPress = (event:KeyboardEvent) => {
    if (event.key === 'Escape') {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  });
}
