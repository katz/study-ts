
export type HttpbinJson = {
  slideshow: {
    author: string;
    date: string;
    title: string;
    slides: {
      title: string;
      type: string;
      items?: string[];
    }[];
  }
};
