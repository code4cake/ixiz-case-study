export type FormatTitleProps = {
    first: string;
    rest: string;
}

export function formatTitle(title: string): FormatTitleProps {
    const words = title.split(" ");
    if (words.length <= 1) return { first: title, rest: "" };
    
    return { first: words[0], rest: words.slice(1).join(" ") };
  }