CREATE TABLE public.user (
  user_id SERIAL PRIMARY KEY,
  email varchar(255)
)

CREATE TABLE public.lineup (
  user_id integer,
  player_count integer,
  lineup varchar,
  PRIMARY KEY(user_id, player_count)
)

INSERT INTO public.lineup (user_id, player_count, lineup)
VALUES (1, 6, 'l');

DROP TABLE public.user
DROP TABLE public.lineup
