insert into posts(title, img, content, author_id)
values(
$1,
$2,
$3,
$4
);
select * from posts;