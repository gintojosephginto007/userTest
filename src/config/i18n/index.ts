import i18n from 'i18n';
import path from 'path';
import config from '../config';

i18n.configure({
    locales: ['en_US', 'es_ES', 'joi_en_US', 'joi_es_ES', 'joi_hi_IN'],
    defaultLocale: config.localizationLanguage,
    directory: path.resolve('./assets/locales/', 'i18n')
});

export default i18n;