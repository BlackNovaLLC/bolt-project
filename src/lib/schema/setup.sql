-- Main setup file that runs all schema files in correct order
\i types.sql
\i tables.sql
\i functions.sql
\i triggers.sql
\i policies.sql
\i realtime.sql