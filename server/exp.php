<?php

    $callback = $_REQUEST['callback'];
    
    // Create the output object.    
    $output = array('experiments' => array(array(
        'expGroupName' => 'Allgemeines',
        'expGroupNumber' => 1,
        'experiments' => array(
            array(
                'expName' => 'Dichtebestimmung',
                'expNumber' => 1,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Elastische Konstanten',
                'expNumber' => 2,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Trägheitsmoment eines Speichenrades',
                'expNumber' => 3,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Das Reversionspendel',
                'expNumber' => 4,
                'leaf' => true,
                'active' => false
            ),
            array(
                'expName' => 'Drehpendel nach Pohl',
                'expNumber' => 5,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Torsionspendel',
                'expNumber' => 6,
                'leaf' => true,
                'active' => false
            ),
            array(
                'expName' => 'Kundtsches Rohr',
                'expNumber' => 7,
                'leaf' => true,
                'active' => false
            ),
            array(
                'expName' => 'Interferenzen von Schallwellen',
                'expNumber' => 8,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Fahrstuhl',
                'expNumber' => 9,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Fallversuch',
                'expNumber' => 10,
                'leaf' => true,
                'active' => false
            ),
            array(
                'expName' => 'Mechanisches Wärmeäquivalent',
                'expNumber' => 11,
                'leaf' => true,
                'active' => true
            )
        )),
        array(                  
        'expGroupName' => 'Kalorik',
        'expGroupNumber' => 2,
        'experiments' => array(
            array(
                'expName' => 'Spezifische Wärme von Festkörpern',
                'expNumber' => 1,
                'leaf' => true,
                'active' => false
            ),
            array(
                'expName' => 'Latente Wärmen von Wasser',
                'expNumber' => 2,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Der Adiabatenexponent/ Resonanzmethode',
                'expNumber' => 3,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Der Adiabatenexponent',
                'expNumber' => 4,
                'leaf' => true,
                'active' => false
            ),
            array(
                'expName' => 'Spezifische Wärme von Wasser',
                'expNumber' => 5,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Luftfeuchte',
                'expNumber' => 6,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Schwarzer Körper',
                'expNumber' => 7,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Wärmepumpe',
                'expNumber' => 8,
                'leaf' => true,
                'active' => false
            ),
            array(
                'expName' => 'Bestimmung des Wirkungsgrades',
                'expNumber' => 9,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Barometrische Höhenformel',
                'expNumber' => 10,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Verflüssigung von Gasen',
                'expNumber' => 11,
                'leaf' => true,
                'active' => false
            )                
        )),
        array(
        'expGroupName' => 'Optik',
        'expGroupNumber' => 3,
        'experiments' => array(
            array(
                'expName' => 'Hauptebenen eines Linsensystems',
                'expNumber' => 1,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Gitter- und Prismenspektrometer',
                'expNumber' => 2,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Brechungsindex',
                'expNumber' => 3,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Photometrische Messungen',
                'expNumber' => 4,
                'leaf' => true,
                'active' => false
            ),
            array(
                'expName' => 'Michelson Interferometer',
                'expNumber' => 5,
                'leaf' => true,
                'active' => true
            ),
            array(
                'expName' => 'Beugung am Gitter',
                'expNumber' => 6,
                'leaf' => true,
                'active' => false
            ),
            array(
                'expName' => 'Reflexion von polarisiertem Licht',
                'expNumber' => 7,
                'leaf' => true,
                'active' => false
            )
        )),
        array(
        'expGroupName'  => 'Elektrotechnik',
        'expGroupNumber' => 4,
        'experiments' => array(
            array(                
                'expName' => 'Kennlinien von Verbrauchern',
                'expNumber' => 1,
                'leaf' => true,
                'active' => true
            ),
            array(     
                'expName' => 'Wheatstonsche Brücke',
                'expNumber' => 2,
                'leaf' => true,
                'active' => false
            ),
            array(    
                'expName' => 'Messbereichserweiterung',
                'expNumber' => 3,
                'leaf' => true,
                'active' => true
            ),
            array(    
                'expName' => 'Kalibrierung eines Thermoelementes',
                'expNumber' => 4,
                'leaf' => true,
                'active' => true
            ),
            array(    
                'expName' => 'Kirchhoffsche Gesetze',
                'expNumber' => 5,
                'leaf' => true,
                'active' => true
            ),
            array(   
                'expName' => 'Magnetfeldmessungen',
                'expNumber' => 6,
                'leaf' => true,
                'active' => true
            ),
            array(     
                'expName' => 'Kennlinien eines Spannungsteilers',
                'expNumber' => 7,
                'leaf' => true,
                'active' => true
            ),
            array(    
                'expName' => 'Innenwiderstand einer Batterie',
                'expNumber' => 8,
                'leaf' => true,
                'active' => true
            ),
            array(     
                'expName' => 'Hoch- und Tiefpass',
                'expNumber' => 9,
                'leaf' => true,
                'active' => false
            ),
            array(    
                'expName' => 'Kennlinien einer Solarzelle',
                'expNumber' => 10,
                'leaf' => true,
                'active' => false
            ),
            array(    
                'expName' => 'Lade- und Entladekurve eines Kondensators',
                'expNumber' => 11,
                'leaf' => true,
                'active' => true
            )   
        )),
        array(                                 
        'expGroupName' => 'Atomphysik',
        'expGroupNumber' => 5,
        'experiments' => array(
            array(                
                'expName' => 'Absorption von Beta-Strahlung',
                'expNumber' => 1,
                'leaf' => true,
                'active' => true
            ),
            array(    
                'expName' => 'Absorption von Gammastrahlung',
                'expNumber' => 2,
                'leaf' => true,
                'active' => true
            ),
            array(    
                'expName' => 'Spezifische Elektronenladung',
                'expNumber' => 3,
                'leaf' => true,
                'active' => true
            ),
            array(    
                'expName' => 'Plancksche Konstante',
                'expNumber' => 4,
                'leaf' => true,
                'active' => false
            ),
            array(    
                'expName' => 'Gammaspektroskopie',
                'expNumber' => 5,
                'leaf' => true,
                'active' => false
            ),
            array(    
                'expName' => 'Balmerserie',
                'expNumber' => 6,
                'leaf' => true,
                'active' => false
            ),
            array(    
                'expName' => 'Röntgenspektrum',
                'expNumber' => 8,
                'leaf' => true,
                'active' => false
            ),
            array(    
                'expName' => 'Röntgendosimetrie',
                'expNumber' => 9,
                'leaf' => true,
                'active' => false
            )            
        ))        
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