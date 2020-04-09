CREATE TABLE restaurants (
  id                int unique,
  name              varchar(30),
  location          varchar(30), 
  noise             varchar(10),
  recommendpercent  int,
  averageoverall    numeric,
  averageservice    numeric,
  averageambience   numeric,
  averagefood       numeric,
  valuerating       numeric
);

CREATE TABLE diners (
  id            int unique,
  firstname     varchar(30),
  lastname      varchar(30),
  city          varchar(30),
  avatarcolor   varchar(10),
  isvip         boolean,
  totalreviews  int
);

CREATE TABLE reviews (
  id              int,
  restaurant      int,
  diner           int,
  text            varchar(1000),
  date            date,
  overall         int,
  food            int,
  service         int,
  ambience        int,
  wouldrecommend  boolean,
  tags            varchar(100)
);