/**
 * 编译期 i18n 入口
 *
 * 使用方式：
 *   import { t, dateLocale } from "@/i18n";
 *   t.nav.home / t.post.readingTime(3) ...
 *
 * 语言由 src/config/locale.ts 中的 `locale` 常量决定，
 * 构建时即完成选择，无运行时切换逻辑。
 */
import { zhCN as zhCNDate, enUS as enUSDate } from "date-fns/locale";
import { locale } from "@/config/locale";
import zhCN from "./zh-CN";
import enUS from "./en-US";

const dictionaries = {
  "zh-CN": zhCN,
  "en-US": enUS,
} as const;

export type Locale = keyof typeof dictionaries;

/** 当前语言字典（编译期确定） */
export const t: (typeof dictionaries)[Locale] =
  (dictionaries as Record<string, (typeof dictionaries)[Locale]>)[locale] ??
  zhCN;

/** date-fns 对应的 locale 对象 */
export const dateLocale =
  (locale as string) === "en-US" ? enUSDate : zhCNDate;

/** <html lang> 直接使用 locale 常量 */
export { locale };
