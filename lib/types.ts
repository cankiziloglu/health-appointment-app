import { getDictionary } from './dictionaries';

export type DictionaryType = Awaited<ReturnType<typeof getDictionary>>;
