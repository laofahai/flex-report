import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.tsx');

export default withNextIntl({
  // ...other next config
});
