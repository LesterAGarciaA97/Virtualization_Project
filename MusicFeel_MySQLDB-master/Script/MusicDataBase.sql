CREATE DATABASE MusicDataBase;

CREATE TABLE MoodCount(
	Mood varchar(200),
	Contador int
);

CREATE TABLE UserMusic(
	ID int NOT NULL AUTO_INCREMENT,
    NAME varchar(30),
    LASTNAME varchar(30),
    USERNAME varchar(30),
	PASSWORD varchar(30),
	Admin int,
    PRIMARY KEY (ID)
);

INSERT INTO MoodCount (Mood, Contador)
VALUES (SAD, 10);


INSERT INTO MoodCount (Mood, Contador)
VALUES (FEAR, 10);


INSERT INTO MoodCount (Mood, Contador)
VALUES (CONFUSED, 10);


INSERT INTO MoodCount (Mood, Contador)
VALUES (CALM, 10);


INSERT INTO MoodCount (Mood, Contador)
VALUES (DISGUSTED, 10);


INSERT INTO MoodCount (Mood, Contador)
VALUES (SURPRISED, 10);


INSERT INTO MoodCount (Mood, Contador)
VALUES (ANGRY, 10);


INSERT INTO MoodCount (Mood, Contador)
VALUES (HAPPY, 10);