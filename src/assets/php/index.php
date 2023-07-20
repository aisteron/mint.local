<?
//$data = json_decode(file_get_contents('php://input'), true);

$data = file_get_contents('php://input');
$data = explode("data=", $data);
$data = json_decode($data[1],true);


//$to = 'mintbarrier@gmail.com';
$to = 'timotheus@list.ru';

$data['type'] == 'tel'
? $subject = 'Перезвонить'
: $subject = 'Отправить прайс';

$data['type'] == 'tel'
? $action = 'Перезвонить '.$data['data']
: $action = 'Отправить прайс на '.$data['data'];


 $message = '
	<html>
	<head>
		<title>'.$subject.'</title>
	</head>
	<body>

    <div class="wraplogo"> <b>MINT BARRIER</b> </div>
    <p>'.$action.'</p>

	
	</body>
</html>';




$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: mint.mailer <robot@mint.by>';

		

if(mail($to, $subject, $message, implode("\r\n", $headers) )){
  
  echo '{"success":true}';

} else {

  echo '{"success":false}';
}
