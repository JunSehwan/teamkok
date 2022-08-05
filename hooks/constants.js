import dayjs from "dayjs";
import kebabCase from "lodash.kebabcase";


export const EMOJI_REPLACEMENT = {
  "😭": ["ToT", "T-T", "T_T", "T.T", ":((", ":-(("],
  "😓": ["'-_-"],
  "😜": [";p", ";-p", ";P", ";-P"],
  "😑": ["-_-"],
  "😢": [":'(", ":'-("],
  "😞": [":(", ":-(", "=(", ")=", ":["],
  "😐": [":|", ":-|"],
  "😛": [":P", ":-P", ":p", ":-p", "=P", "=p"],
  "😁": [":D", ":-D", "=D", ":d", ":-d", "=d"],
  "😗": [":*", ":-*"],
  "😇": ["O:)", "O:-)"],
  "😳": ["O_O", "o_o", "0_0"],
  "😊": ["^_^", "^~^", "=)"],
  "😠": [">:(", ">:-(", ">:o", ">:-o", ">:O", ">:-O"],
  "😎": ["8)", "B)", "8-)", "B-)", ":))"],
  "😚": ["-3-"],
  "😉": [";)", ";-)"],
  "😲": [":O", ":o", ":-O", ":-o"],
  "😣": [">_<", ">.<"],
  "😘": [";*", ";-*"],
  "😕": [":/", ":-/", ":\\", ":-\\", "=/", "=\\"],
  "🙂": [":)", ":]", ":-)", "(:", "(="],
  "♥": ["<3"],
  "😂": [":')"],
  "🤑": ["$-)"],
};

export const EMOJI_REGEX = /^\p{Extended_Pictographic}$/u;

export const formatFileName = (name) => {
  const splitted = name.split(".");

  const extension = splitted.slice(-1)[0];
  const baseName = splitted.slice(0, -1).join(".");

  return `${Date.now()}-${kebabCase(
    baseName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
  )}.${extension}`;
};

export const formatFileSize = (size) => {
  let i = Math.floor(Math.log(size) / Math.log(1024));

  return `${(size / Math.pow(1024, i)).toFixed(1)} ${["B", "KB", "MB", "GB", "TB"][i]
    }`;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const formatter = dayjs(date);
  const now = new Date();

  if (dayjs().isSame(formatter, "date")) return formatter.format("h:mm A");

  if (dayjs().isSame(formatter, "week")) return formatter.format("ddd h:mm A");

  if (now.getFullYear() === date.getFullYear())
    return formatter.format("MMM DD h:mm A");

  return formatter.format("DD MMM YYYY h:mm A");
};

export const FILE_ICON = (extension) =>
  `https://cdn.jsdelivr.net/gh/napthedev/file-icons/file/${extension}.svg`;

export const splitLinkFromMessage = (message) => {
  const URL_REGEX =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm;

  const result = message?.split(" ").reduce((acc, item) => {
    const isURL = URL_REGEX.test(item);
    if (isURL) acc.push({ link: item });
    else {
      if (typeof acc.slice(-1)[0] === "string") {
        acc = [...acc.slice(0, -1), `${acc.slice(-1)[0]} ${item}`];
      } else {
        acc.push(item);
      }
    }

    return acc;
  }, []);
  // as ({ link: string } | string)[]
  return result;
};


export const REACTIONS_UI = {
  Like: {
    icon: "/reactions-icon/like.svg",
    gif: "/reactions/like.gif",
  },
  Love: {
    icon: "/reactions-icon/love.svg",
    gif: "/reactions/love.gif",
  },
  Care: {
    icon: "/reactions-icon/care.svg",
    gif: "/reactions/care.gif",
  },
  Haha: {
    icon: "/reactions-icon/haha.svg",
    gif: "/reactions/haha.gif",
  },
  Wow: {
    icon: "/reactions-icon/wow.svg",
    gif: "/reactions/wow.gif",
  },
  Sad: {
    icon: "/reactions-icon/sad.svg",
    gif: "/reactions/sad.gif",
  },
  Angry: {
    icon: "/reactions-icon/angry.svg",
    gif: "/reactions/angry.gif",
  },
};
