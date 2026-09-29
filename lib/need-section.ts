export type NeedStat = {
  value: string;
  caption: string;
};

export type NeedSlide = {
  index: string;
  tag: string;
  title: string;
  accent: string;
  href: string;
};

export const NEED_STATS: NeedStat[] = [
  {
    value: "94%",
    caption: "Of first impressions about a business come from its design.",
  },
  {
    value: "3×",
    caption: "Increase in revenue is seen by businesses that switch from a website to an app.",
  },
  {
    value: "99%",
    caption: "Of users won’t reopen an app after a bad first experience.",
  },
  {
    value: "53%",
    caption: "Of mobile users will abandon an app if it takes more than 5 seconds to load.",
  },
];

export const NEED_SLIDES: NeedSlide[] = [
  {
    index: "1",
    tag: "About Us",
    title: "We blend the power of strategy, design, and code to transform your vision into an app which keeps its users",
    accent: "HOOKED!",
    href: "/about",
  },
  {
    index: "2",
    tag: "Our Services",
    title: "With an in-house team of designers, developers and animators, we build applications that",
    accent: "STAND OUT from the crowd!",
    href: "/services",
  },
];

export const NEED_VIDEO_SRC = "/brand/need-phone-reel.mp4";
