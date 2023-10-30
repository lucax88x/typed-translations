import en from "./translations.json";

type Translations = typeof en;

type GetExpression<T extends string> =
  T extends `${string}{${infer Ident}}${infer Rest}`
    ? Ident | GetExpression<Rest>
    : never;

export function translate<TranslationKey extends keyof Translations>(
  i18nKey: TranslationKey,
  ...variables: GetExpression<Translations[TranslationKey]> extends never
    ? []
    : [Record<GetExpression<Translations[TranslationKey]>, string>]
) {
  console.log(i18nKey, variables);

  return en[i18nKey];
}

export function setupTranslations() {
  console.log(translate("key1"));
  console.log(translate("key2", { placeholder1: "todo" }));
}
