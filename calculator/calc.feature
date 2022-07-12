Feature: screen calculator

Scenario: When I start the calculator
Given I'm on the calculator
 When I dont click any button
 Then In the result-screen should be a 0 as a placeholder

Scenario: Clicking a number button
 Given I'm on the calculator
  When I click a number button 0
  Then The number is shown on the screen

Scenario Outline: Add one number when there's one or more numbers on the result-screen
 Given I'm on the calculator
  When When I click any <number-button>
  Then Number is shown on the <result-screen>
 
  Example:

  | number-button | result-screen |
  | 5             | 5             |
  | 6             | 56            |

Scenario: Pressing a number button on the keyboard
 Given I'm on the calculator
  When I press any <number-button> on the keyboard,the coma key or <operation-buttons>
  Then The number or sign is not shown on the <result-screen>
 
Scenario Outline: I press + as a first value
 Given I'm on the calculator
  When When i click <equal-button> having sum as first value
  Then The calculator gives error

  Example:
  | number-button | result-screen |
  | +             | +             |
  | 6             | +6            |
  | =             | NaN           |
  
 
Scenario Outline: Division by zero
 Given I'm on the calculator
  When I click a <first-number> AND I click a <operator-button> 
  And I click the <second-number>
  Then show a message: "Cannot divide by zero"
 Example: 
 
 |  first-number  |  operator-button | second-number | result-screen         |
 | 5              |   /              |    0          | Cannot divide by zero |
 
 
 
Scenario Outline: Three number operation on the result screen
 Given I'm on the calculator
  When I click <equal-button> while having 3 operations
  Then <result-screen> gives wrong <total>
 Example: 
 |  result-screen | total | correct total |
 |     3+5+2      |   8   |      10       |
 
 
Scenario: Pressing the Enter key on the keyboard
    Given I'm on the calculator
    And I have an operation on the screen
    When I press the Enter key on the keyboard
    Then The result is not shown in the result screen
 
Scenario: Click on the equal button
 Given I'm on the calculator
 And I have an operation on the screen
  When I click the <equal-button> on the calculator
  Then The result is shown in the <result-screen>
 


Scenario: Clear the screen calculator
 Given I'm on the calculator
  When I click <clear-button>
  Then the content on the <result-screen> will be  erased
 

Scenario: Writing less than 10 digits
 Given I'm on the calculator
  When I press a any <number-button> 
  Then new digit is displayed on the <result-screen>

Scenario: Writing more than 10 digits
 Given I'm on the calculator
  When I press a any <number-button> 
  Then new digit doesn't displayed on the <result-screen>

Scenario: Writing a number with more than 1 comma
 Given I have a number with one comma in screen
  When I click <comma-button>
  Then Error is shown in the result screen


Scenario: Clicking two operators button
 Given I'm on the calculator
  When I click a <plus-operator> And I click 
  a <minus-operator>
  Then the <plus
 



































 ------------------------

  Scenario Outline: Doing an addition operation with a result number with less than 10 digits
Given I have already written <firstNumber>
When I click <sum-operator> +
And I write the <secondNumber>
And I click the <equal-button> 
Then <Result> of adding this 2 numbers is show on screen 

Examples:
|firstNumber|sum-operator|secondNumber|equal-button|Result|
|         24|   +        |           6|   =	       |    30|
|       24,2|   +        |         6,4|   =	       |  30,6|
|      13,14|   +        |       2,781|   =	       |15,921|

Scenario: Doing an addition operation with a result number with more than 10 digits
Given I have already written a number
When I click + button
And I write a second number
And I click = button
Then operation not allowed

Scenario  Outline: Doing a minus operation with a result number with less than 10 digits
Given I have already written <firstNumber>
When I click <minus-operator> -
And I write <secondNumber>
And I click <equal-button> =
Then <Result> of substracting this 2 numbers is show in screen 

Examples:
|firstNumber|minus-operator|secondNumber|equal-button|Result|
|         24|   -          |           6|   =	     |    18|
|          6|   -          |          24|   =	     |   -18|
|       24,2|   -          |         6,4|   =	     |  17,8|
|      13,14|   -          |       2,781|   =	     |10,359|

Scenario Outline: Doing a multiplication operation with a result number with less than 10 digits
Given I have already written <firstNumber>
When I click <Button> *
And I write <secondNumber>
And I click <Button2> =
Then <Result> of multipliyng this 2 numbers is show in screen 

Examples:
|firstNumber|Button|secondNumber|Button2|Result|
|         10|   *  |           8|  =	|    80|
|        5,2|   *  |           8|  =	|  41,6|
|      36,25|   *  |       7,496|  =	|271,73|

Scenario: Doing an multiplication operation with a result number with more than 10 digits
Given I have already written a number
When I click the * button
And I write another number
And I click the = button
Then operation not allowed

Scenario Outline: Doing a division operation with a result number with less than 10 digits
Given I have already written a <firstNumber>
When I click the <Button> /
And I write the <secondNumber>
And I click <Button2> =
Then <Result> is shown

Examples:
|firstNumber|Button|secondNumber|Button2|Result|
|         10|   /  |           2|   =	|     5|
|         84|   /  |         4,3|   =	|19,5348837|
|      23,58|   /  |       10,14|   =   |2,32544379|

Scenario: A division with a result with more than 10 digits
Given a number
When I click the / button
And I write another number
And I click = button
Then operation not allowed

Scenario Outline: Clicking two different operation buttons
Given I have already written a <firstNumber>
And I clicked an operation <Button>
And I clicked an operation <Button2> 
And I inputed a <secondNumber> number
When I push the = button
Then the <Result> is shown

|firstNumber|Button|Button2|secondNumber|Result|
|         12|   +  |   -   |           6|     6|
|       1234|   -  |   +   |          31|  1265|
|       9,26|   *  |   *   |       2,15 |19,909|




