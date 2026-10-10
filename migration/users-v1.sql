-- Task (14) create an Admin named
-- store_manager with SELECT, INSERT, UPDATE permissions on all tables
CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '';
GRANT SELECT, INSERT, UPDATE ON retail_store.* TO 'store_manager'@'localhost';

-- Task (15) revoke UPDATE
REVOKE UPDATE ON retail_store.* FROM 'store_manager'@'localhost';

-- Task (16) DELETE only on the Sales table
GRANT DELETE ON retail_store.Sales TO 'store_manager'@'localhost';

-- extra for learning
-- show grants for store_manager
SHOW GRANTS FOR 'store_manager'@'localhost';

-- delete the user
DROP USER 'store_manager'@'localhost';
