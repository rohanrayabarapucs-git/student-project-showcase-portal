CREATE TABLE Clients (
    client_id INT PRIMARY KEY,
    client_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);

CREATE TABLE Tours (
    tour_id INT PRIMARY KEY,
    tour_name VARCHAR(100),
    destination VARCHAR(100),
    start_date DATE,
    end_date DATE,
    price DECIMAL(10,2)
);

CREATE TABLE Reservations (
    reservation_id INT PRIMARY KEY,
    client_id INT,
    tour_id INT,
    booking_date DATE,
    FOREIGN KEY (client_id) REFERENCES Clients(client_id),
    FOREIGN KEY (tour_id) REFERENCES Tours(tour_id)
);
