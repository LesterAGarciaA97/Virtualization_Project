/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     4/07/2020 07:32:51                           */
/*==============================================================*/


drop table if exists DASHBOARD;

drop table if exists EMOCION;

drop table if exists ROL;

drop table if exists USUARIO;

/*==============================================================*/
/* Table: DASHBOARD                                             */
/*==============================================================*/
create table DASHBOARD
(
   ID_DASHBOARD         int not null,
   GENERO               varchar(50),
   primary key (ID_DASHBOARD)
);

/*==============================================================*/
/* Table: EMOCION                                               */
/*==============================================================*/
create table EMOCION
(
   ID_EMOCION           int not null,
   primary key (ID_EMOCION)
);

/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
create table ROL
(
   ID_ROL               int not null,
   ID_DASHBOARD         int,
   ID_EMOCION           int,
   primary key (ID_ROL)
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO
(
   ID_USUARIO           int not null,
   ID_ROL               int,
   NOMBRE               varchar(50),
   APELLIDO             varchar(50),
   CORREO               varchar(50),
   CONTRASENIA          varchar(100),
   primary key (ID_USUARIO)
);

alter table ROL add constraint FK_REFERENCE_2 foreign key (ID_DASHBOARD)
      references DASHBOARD (ID_DASHBOARD) on delete restrict on update restrict;

alter table ROL add constraint FK_REFERENCE_3 foreign key (ID_EMOCION)
      references EMOCION (ID_EMOCION) on delete restrict on update restrict;

alter table USUARIO add constraint FK_REFERENCE_1 foreign key (ID_ROL)
      references ROL (ID_ROL) on delete restrict on update restrict;

