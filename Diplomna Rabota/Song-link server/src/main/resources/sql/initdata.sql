INSERT INTO role (id, name) values (1, 'User'),
                                   (2, 'Admin')
                                    ON CONFLICT DO NOTHING;
INSERT into users (id, email, emailverification, password, username) values (1,'admin',true,'$2a$10$UeZ2zp5Eu6lZSC1/mC4ZC.5AB/LZzvKB6LQU/OAyvOnnvmQkYBxGO','admin') ON CONFLICT DO NOTHING;
