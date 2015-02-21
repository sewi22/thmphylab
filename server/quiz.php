<?php

    $callback = $_REQUEST['callback'];
    
    // Create the output object.    
    $output = array('quiz' => array(
        array(
            'expGroupNumber' => 1,
            'expNumber' => 1,
            'questions' => array(              
                array(
                    'question' => 'Wer war erster Bundeskanzler der BRD?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "Adenauer",
                            "correct" => true,                
                            "helpText" => "Das ist richtig"
                        ),
                        array(
                            "answer" => "Kohl",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        ),
                        array(
                            "answer" => "Heuss",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        )
                    )                
                ),
                array(
                    'question' => 'Wieviele Seiten hat ein W&uuml;rfel?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "sechs",
                            "correct" => true,
                            "helpText" => "Falsch"
                        ),
                        array(
                            "answer" => "vier",
                            "correct" => false,
                            "helpText" => "Falsch"
                        ),
                        array(
                            "answer" => "sechs",
                            "correct" => true,
                            "helpText" => "Logisch"
                        ),
                        array(
                            "answer" => "acht",
                            "correct" => false,
                            "helpText" => "Falsch"
                        )
                    )
                ),            
                array(
                    'question' => 'Ab welcher Temperatur kocht Wasser?',
                    'questionType' => 'number',
                    'answers' => array(100.5),
                    'plus' => 3,
                    'minus' => 2.2                     
                ),
                array(
                    'question' => 'Welches ist das wertvollste Unternehmen der Welt?',
                    'questionType' => 'text',
                    'answers' => array('A pP?lE')
                )
            )
        ),
        array(
            'expGroupNumber' => 1,
            'expNumber' => 2,
            'questions' => array(
                array(
                    'question' => 'Wieviele Bundesl&auml;nder hat Deutschland?',
                    'questionType' => 'number',
                    'answers' => array(16)                    
                ),
                array(
                    'question' => 'Wieviele Monate haben 28 Tage?',
                    'questionType' => 'text',
                    'answers' => array('Jeder ', 'al-le')                    
                ),
                array(
                    'question' => 'Welche deutsche Stadt hat derzeit keinen Fu&szlig;ball Erstligisten?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "Frankfurt",
                            "correct" => false,
                            "helpText" => "Jeder Monat hat 28 Tage"
                        ),
                        array(
                            "answer" => "Hamburg",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        ),
                        array(
                            "answer" => "K&ouml;ln",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        ),
                        array(
                            "answer" => "M&uuml;nchen",
                            "correct" => false,
                            "helpText" => "Nat&uuml;rlich haben alle Monate 28 Tage"
                        )
                    )
                ),
                array(
                    'question' => 'Wer wird Deutscher Meister?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "Eintracht Frankfurt",
                            "correct" => true,
                            "helpText" => "Wer sonst"
                        ),
                        array(
                            "answer" => "Eintracht Frankfurt",
                            "correct" => true,
                            "helpText" => "Die Bayern nicht"
                        )
                    )
                )
            )
        )       
    ));
        
    //start output    
    if ($callback) {
        header('Content-Type: text/javascript');        
        echo $callback . '(' . json_encode($output) . ');';
    } else {
        header('Content-Type: application/x-json');
        echo json_encode($output);
    }    
    
?>