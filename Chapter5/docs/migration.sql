create table customers (
    id BIGSERIAL primary key,
	email varchar(30) not null,
	name varchar(30) not null,
)

create table cars (
    id BIGSERIAL primary key,
	name varchar(30) not null,
	price varchar(30) not null,
	car_foto text not null,
)

create table categories (
    id BIGSERIAL primary key,
	name varchar(30) not null
)

create table car_categories (
    id BIGSERIAL primary key,
	car_id bigint not null,
	category_id bigint not null,
)
