# Supabase PostgreSQL CA

`supabase-ca.crt` is the public Supabase Root 2021 CA certificate, valid until April 26, 2031. It contains no private key.

Source: https://supabase-downloads.s3-ap-southeast-1.amazonaws.com/prod/ssl/prod-ca-2021.crt

Refresh from the project's Dashboard → Database Settings → SSL Configuration if Supabase rotates its CA. The runtime and Prisma CLI verify both the certificate chain and hostname; `DATABASE_CA_CERT` can override this bundled trust anchor.

Documentation: https://supabase.com/docs/guides/platform/ssl-enforcement
