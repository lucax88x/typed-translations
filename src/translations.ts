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

  const translation = en[i18nKey];

  if(!translation) {
    return '';
  }
  
  
  if(variables.length > 0) {
    return replacePlaceholders(translation, variables[0]);
  }

  return translation;
}

function replacePlaceholders(inputString: string, replacementObject: Record<string, string>): string {
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
