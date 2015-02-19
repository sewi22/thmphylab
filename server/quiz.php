<?php

    $callback = $_REQUEST['callback'];
    
    // Create the output object.    
    $output = array('quiz' => array(
        array(
            'expGroupNumber' => 1,
            'expNumber' => 1,
            'questions' => array(              
                array(
                    'question' => '1 Wer war erster Bundeskanzler der BRD?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "A denauer",
                            "correct" => true,                
                            "helpText" => "Das ist richtig"
                        ),
                        array(
                            "answer" => "B denauer",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        ),
                        array(
                            "answer" => "C denauer",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        ),
                        array(
                            "answer" => "D denauer",
                            "correct" => false,
                            "helpText" => "Nur fast Richtig"
                        )
                    )                
                ),
                array(
                    'question' => '2 Wieviele Seiten hat ein W&uuml;rfel?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "A 1",
                            "correct" => false,
                            "helpText" => "Falsch"
                        ),
                        array(
                            "answer" => "B 4",
                            "correct" => false,
                            "helpText" => "Falsch"
                        ),
                        array(
                            "answer" => "C 6",
                            "correct" => true,
                            "helpText" => "Logisch"
                        ),
                        array(
                            "answer" => "D 12",
                            "correct" => false,
                            "helpText" => "Falsch"
                        )
                    )
                ),            
                array(
                    'question' => '3 Wie hei&szlig;t die Hauptstadt Italiens?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "A Neapel",
                            "correct" => false,
                            "helpText" => "Das stimmt nicht"
                        ),
                        array(
                            "answer" => "B Mailand",
                            "correct" => false,
                            "helpText" => "Falsch"
                        ),
                        array(
                            "answer" => "C Turin",
                            "correct" => false,
                            "helpText" => "N&ouml;"
                        ),
                        array(
                            "answer" => "D Rom",
                            "correct" => true,
                            "helpText" => "Korrekt"
                        )
                    )
                ),
                array(
                    'question' => '4 Welches ist das wertvollste Unternehmen der Welt?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "A Microsoft",
                            "correct" => false,
                            "helpText" => "Das ist falsch"
                        ),
                        array(
                            "answer" => "B Apple",
                            "correct" => true,
                            "helpText" => "Stimmt"
                        ),
                        array(
                            "answer" => "C Coca Cola",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        ),
                        array(
                            "answer" => "D IBM",
                            "correct" => false,
                            "helpText" => "Nicht richtig"
                        )
                    )
                )
            )
        ),
        array(
            'expGroupNumber' => 1,
            'expNumber' => 2,
            'questions' => array(
                array(
                    'question' => '1 Wieviele Bundesl&auml;nder hat Deutschland?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "A 10",
                            "correct" => false,
                            "helpText" => "Das ist falsch"
                        ),
                        array(
                            "answer" => "B 16",
                            "correct" => true,
                            "helpText" => "Das ist richtig"
                        ),
                        array(
                            "answer" => "C 19",
                            "correct" => false,
                            "helpText" => "Stimmt gar nicht"
                        ),
                        array(
                            "answer" => "D 22",
                            "correct" => false,
                            "helpText" => "Ganz falsch"
                        )
                    )
                ),
                array(
                    'question' => '2 Wieviele Monate haben 28 Tage?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "A keiner",
                            "correct" => false,
                            "helpText" => "Jeder Monat hat 28 Tage"
                        ),
                        array(
                            "answer" => "B einer",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        ),
                        array(
                            "answer" => "C zwei",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        ),
                        array(
                            "answer" => "D alle",
                            "correct" => true,
                            "helpText" => "Nat&uuml;rlich haben alle Monate 28 Tage"
                        )
                    )
                ),
                array(
                    'question' => '3 Wer wird Deutscher Meister?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "A Eintracht Frankfurt",
                            "correct" => true,
                            "helpText" => "Wer sonst"
                        ),
                        array(
                            "answer" => "B Eintracht Frankfurt",
                            "correct" => true,
                            "helpText" => "Die Bayern nicht"
                        ),
                        array(
                            "answer" => "C Eintracht Frankfurt",
                            "correct" => true,
                            "helpText" => "Ganz sicher nicht der HSV"
                        ),
                        array(
                            "answer" => "D Eintracht Frankfurt",
                            "correct" => true,
                            "helpText" => "Nur die SGE"
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