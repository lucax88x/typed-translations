import { en } from "./translations-en";

type Translations = typeof en;
type TranslationKey = keyof Translations;

type GetExpression<T extends string> =
  T extends `${infer Left}{${infer Ident}}${infer Right}`
    ? Ident extends string
      ? Ident
      : Left extends string
      ? GetExpression<Left>
      : Right extends string
      ? GetExpression<Right>
      : never
    : never;

type Placeholders = GetExpression<Translations[TranslationKey]>;

export function translate<TranslationKey extends keyof Translations>(
  i18nKey: TranslationKey,
  ...variables: GetExpression<Translations[TranslationKey]> extends never
    ? []
    : [Record<Placeholders, string>]
) {
  const translation = en[i18nKey];

  if (!translation) {
    return "";
  }

  if (variables.length > 0) {
    return replacePlaceholders(translation, variables[0]);
  }

  return translation;
}

function replacePlaceholders<TranslationKey extends keyof Translations>(
  inputString: string,
  replacementObject: GetExpression<Translations[TranslationKey]>,
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
  console.log(translate("key1"));
  console.log(translate("key2", { placeholder1: "todo" }));
}
