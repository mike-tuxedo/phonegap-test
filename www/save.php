 <?php
/*-----------------------------------------
 	Datenbank Verbindungskonfiguration
-------------------------------------------*/

/*
$DB_NAME = "tuxedoShows";
$DB_USER = "tuxedo";
$DB_PASS = "t3CQ7crMqYBM7QsQ";
$DSN     = "mysql:dbname=$DB_NAME;host=93.180.156.121";
*/
$DB_NAME = "tuxedoShows";
$DB_USER = "root";
$DB_PASS = "alternativ";
$DSN     = "mysql:dbname=$DB_NAME;host=localhost";

try {
    $dbh = new PDO($DSN, $DB_USER, $DB_PASS);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
}

/*-----------------------------------------
            Request Check
-------------------------------------------*/

$request_method = strtolower($_SERVER['REQUEST_METHOD']);

switch ($request_method) {
    case 'post': echo json_encode('post');
                $data = json_decode(file_get_contents('php://input'), true);
                $sql = "INSERT INTO shows (Veranstaltung, Ort, Kilometer, Datum, Hannes, Kiebe, Mike, Reini, Till, Bus, Gage, Bett, Bewertung, Anmerkung) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $sth = $dbh->prepare($sql);
                $sth->execute(array(
                    $data['Veranstaltung'],
                    $data['Ort'],
                    $data['Kilometer'],
                    $data['Datum'],
                    $data['Hannes'],
                    $data['Kiebe'],
                    $data['Mike'],
                    $data['Reini'],
                    $data['Till'],
                    $data['Bus'],
                    $data['Gage'],
                    $data['Bett'],
                    $data['Bewertung'],
                    $data['Anmerkung']
                ));
                break;
    case 'get': $sth = $dbh->prepare("SELECT * FROM shows");
                $sth->execute();
                $result = $sth->fetchAll();
                echo json_encode($result);
                break;
    case 'put': echo json_encode('put'); break;
    case 'delete': echo json_encode('delete'); break;
    case 'default': echo json_encode('unknown request'); break;
}

//$id = $dbh->lastInsertId();
?>