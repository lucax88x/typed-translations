import { en } from "./translations-en";

type Translations = typeof en;
type TranslationKey = keyof Translations;

type Placeholders<T extends string> =
  T extends `${infer Left}{${infer Placeholder}}${infer Right}`
    ? Placeholders<Left> | Placeholder | Placeholders<Right>
    : never;

type PlaceholdersOf<TKey extends TranslationKey> = Placeholders<
  Translations[TKey]
> extends never
  ? []
  : [Record<Placeholders<Translations[TKey]>, string>];

export function translate<TKey extends TranslationKey>(
  key: TKey,
  ...placeholders: PlaceholdersOf<typeof key>
) {
  const translation = en[key];

  if (!translation) {
    return "";
  }

  if (placeholders.length > 0) {
    return replacePlaceholders(key, translation, placeholders[0]);
  }

  return translation;
}

function replacePlaceholders<TKey extends TranslationKey>(
  key: TKey,
  inputString: string,
  replacementObject: PlaceholdersOf<typeof key>,
): string {
  return inputString.replace(/\{(\w+)\}/g, (match, placeholder) => {
    if (replacementObject.hasOwnProperty(placeholder)) {
      return replacementObject[placeholder];
    } else {
      return match;
    }
  });
}

export function setupTranslations(_: HTMLDivElement) {
  translate("key1");
  translate("key2", { placeholder1: "test" });
  translate("key3", { placeholder2: "test" });
  translate("key4", { placeholder3: "test" });
}
