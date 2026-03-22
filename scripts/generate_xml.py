import os
import html

target_dir = "/Users/bethmij/FleetGuard_AI/fleetguard-ai-service/project_management_docs"
target_file = os.path.join(target_dir, "Test_Cases.xml")

if not os.path.exists(target_dir):
    os.makedirs(target_dir, exist_ok=True)

def esc(txt):
    if txt is None:
        return ""
    return html.escape(str(txt))

xml_content = """<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Author>Iruwan Tharaka (Quality Manager)</Author>
  <Company>FleetGuard AI</Company>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Bottom"/>
   <Borders/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11"/>
  </Style>
  <Style ss:ID="Header">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Font ss:Bold="1" ss:Color="#FFFFFF" ss:Size="11"/>
   <Interior ss:Color="#4472C4" ss:Pattern="Solid"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
  </Style>
  <Style ss:ID="CellNormal">
   <Alignment ss:Vertical="Top" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
  </Style>
  <Style ss:ID="HighPriority">
   <Alignment ss:Vertical="Top" ss:WrapText="1"/>
   <Interior ss:Color="#FFC7CE" ss:Pattern="Solid"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
  </Style>
  <Style ss:ID="MediumPriority">
   <Alignment ss:Vertical="Top" ss:WrapText="1"/>
   <Interior ss:Color="#FFEB9C" ss:Pattern="Solid"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
  </Style>
  <Style ss:ID="LowPriority">
   <Alignment ss:Vertical="Top" ss:WrapText="1"/>
   <Interior ss:Color="#C6EFCE" ss:Pattern="Solid"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
  </Style>
 </Styles>
"""

sheets_data = {
    "Authentication": {
        "scenario": "Validate Authentication Flow",
        "cases": [
            {
                "id": "TC-AUTH-001",
                "case": "Verify Driver Login with Valid Credentials",
                "steps": "1. Open app\n2. Select English\n3. Enter valid driver email\n4. Enter correct password\n5. Click Login",
                "data": "Email: driver1@demo.fleetguard.com\nPass: Demo123!",
                "expected": "User is authenticated and redirected to Driver Dashboard",
                "priority": "High"
            },
            {
                "id": "TC-AUTH-002",
                "case": "Verify Driver Login with Invalid Password",
                "steps": "1. Enter valid driver email\n2. Enter wrong password\n3. Click Login",
                "data": "Email: driver1@demo.fleetguard.com\nPass: WrongPassword",
                "expected": "Error message displayed: 'Invalid credentials'",
                "priority": "High"
            },
            {
                "id": "TC-AUTH-003",
                "case": "Verify Driver Signup - Valid Data",
                "steps": "1. Click Register\n2. Enter full name\n3. Enter new email\n4. Enter password\n5. Select Driver role\n6. Click Continue",
                "data": "Name: John Doe\nEmail: john@new.com\nPass: Password123!",
                "expected": "Account created and user receives login token or verification",
                "priority": "High"
            },
            {
                "id": "TC-AUTH-004",
                "case": "Verify Duplicate Email Signup",
                "steps": "1. Enter existing email\n2. Fill password\n3. Click Register",
                "data": "Email: driver1@demo.fleetguard.com (exists)",
                "expected": "Error message: 'Email already exists' (409)",
                "priority": "High"
            },
            {
                "id": "TC-AUTH-005",
                "case": "Verify Forgot Password Email Trigger",
                "steps": "1. Click Forgot Password\n2. Enter registered email\n3. Click Send Reset Link",
                "data": "Email: driver1@demo.fleetguard.com",
                "expected": "Success message: 'Reset link sent to your email'",
                "priority": "Medium"
            },
            {
                "id": "TC-AUTH-006",
                "case": "Verify Role Access (Driver to Manager Page)",
                "steps": "1. Login as Driver\n2. Manually navigate to /manager/dashboard",
                "data": "N/A",
                "expected": "Access denied (403) or redirected back to Driver interface",
                "priority": "High"
            }
        ]
    },
    "Driver - Inspection": {
        "scenario": "Validate Inspection Workflow",
        "cases": [
            {
                "id": "TC-INSP-001",
                "case": "Step 1: Vehicle Selection loads properly",
                "steps": "1. Click 'Start Inspection'\n2. View available vehicles list",
                "data": "N/A",
                "expected": "List of available vehicles from API displayed with correct details",
                "priority": "High"
            },
            {
                "id": "TC-INSP-002",
                "case": "Step 1: Select Vehicle and Proceed",
                "steps": "1. Select a vehicle from the list\n2. Click 'Next'",
                "data": "Vehicle ID select",
                "expected": "Proceeds to Step 2: Customer Details",
                "priority": "High"
            },
            {
                "id": "TC-INSP-003",
                "case": "Step 2: Customer Details Validation",
                "steps": "1. Try proceeding with empty Customer Name\n2. View error",
                "data": "Empty fields",
                "expected": "Error prompts to enter required fields",
                "priority": "Medium"
            },
            {
                "id": "TC-INSP-004",
                "case": "Step 3: Photo Capture checklist",
                "steps": "1. Verify it asks for 8 specific angles (Front, Rear, Side, etc.)",
                "data": "8 checklist items",
                "expected": "8 distinct angles listed with camera triggers",
                "priority": "High"
            },
            {
                "id": "TC-INSP-005",
                "case": "Step 5: AI Processing Loader",
                "steps": "1. Upload photos\n2. Observe 'AI Processing' screen",
                "data": "8 Photos uploaded",
                "expected": "Animated loader display; triggers backend Flask API inference",
                "priority": "High"
            },
            {
                "id": "TC-INSP-006",
                "case": "Step 6: AI Detection Result View",
                "steps": "1. Wait for processing\n2. View results",
                "data": "YOLO output",
                "expected": "Display images with bounded boxes on detected damages & health score",
                "priority": "High"
            },
            {
                "id": "TC-INSP-007",
                "case": "Step 7: Digital Signatures",
                "steps": "1. Draw on canvas for Driver signature\n2. Draw for Customer\n3. Click Save",
                "data": "Signature data URL",
                "expected": "Signatures saved in inspection payload",
                "priority": "Medium"
            },
            {
                "id": "TC-INSP-008",
                "case": "Step 8: PDF Report triggers download",
                "steps": "1. Click 'Generate PDF Mail'\n2. Check browser downloads",
                "data": "N/A",
                "expected": "PDF downloads containing inspection details and photo URLs",
                "priority": "High"
            }
        ]
    },
    "Manager - Fleet": {
        "scenario": "Validate Fleet Management",
        "cases": [
            {
                "id": "TC-FLEET-001",
                "case": "Verify Dashboard Stats match item count",
                "steps": "1. View 'Total Vehicles' card\n2. Navigate to Fleet count list",
                "data": "N/A",
                "expected": "Dashboard stat matches total count of vehicles in fleet",
                "priority": "High"
            },
            {
                "id": "TC-FLEET-002",
                "case": "Verify Add Vehicle - Validation Fail (Duplicate Number)",
                "steps": "1. Click Add Vehicle\n2. Enter existing Registration Number\n3. Click Save",
                "data": "Reg: WP-CAB-1234",
                "expected": "Error message displayed for duplicate vehicle",
                "priority": "High"
            },
            {
                "id": "TC-FLEET-003",
                "case": "Verify Add Vehicle - Success",
                "steps": "1. Fill valid make, model, year, reg number\n2. Upload vehicle cover photo\n3. Click Save",
                "data": "Toyota, Corolla, 2022, NC-5678",
                "expected": "Vehicle added to list, success notification shown",
                "priority": "High"
            },
            {
                "id": "TC-FLEET-004",
                "case": "Verify Edit Vehicle Mileage / Status",
                "steps": "1. Open vehicle details\n2. Click Edit\n3. Update Status to 'In Maintenance'\n4. Save",
                "data": "Status: Maintenance",
                "expected": "List reflects 'In Maintenance' instantly",
                "priority": "High"
            }
        ]
    },
    "Manager - Drivers": {
        "scenario": "Validate Driver Management",
        "cases": [
            {
                "id": "TC-DRIVERS-001",
                "case": "Verify Driver List loads with filtering",
                "steps": "1. Open Driver Management\n2. Type driver name in search bar",
                "data": "Search: 'Saman'",
                "expected": "List filters drivers whose name matches substring",
                "priority": "Medium"
            },
            {
                "id": "TC-DRIVERS-002",
                "case": "Verify Add Driver successfully",
                "steps": "1. Click Add Driver\n2. Enter valid email, name, role\n3. Submit",
                "data": "Fill fields correctly",
                "expected": "Driver shows up in grid, API returns 201",
                "priority": "High"
            }
        ]
    },
    "Manager - Analytics & Map": {
        "scenario": "Validate Analytics and Tracking",
        "cases": [
            {
                "id": "TC-ANLYTICS-001",
                "case": "Verify Core Analytics trends load",
                "steps": "1. Open Analytics dashboard\n2. Observe Charts (Health trends, damage type distributions)",
                "data": "N/A",
                "expected": "Canvas/recharts instances render data without crash",
                "priority": "High"
            },
            {
                "id": "TC-MAP-001",
                "case": "Verify Google Map loads with Markers",
                "steps": "1. Navigate to 'Live Fleet Tracking'\n2. View Map render",
                "data": "N/A",
                "expected": "Google Maps overlay displays with active vehicle pins",
                "priority": "High"
            },
            {
                "id": "TC-MAP-002",
                "case": "Verify Marker Popup Info",
                "steps": "1. Click a vehicle pin on the map",
                "data": "Click coordinate pin",
                "expected": "Info box pops up with Vehicle Reg, Driver Name, and Health Score",
                "priority": "Medium"
            }
        ]
    },
    "Manager - Smart Assignment": {
        "scenario": "Validate AI-Powered Vehicle Assignment",
        "cases": [
            {
                "id": "TC-SMART-001",
                "case": "Verify Smart Recommendations Load",
                "steps": "1. Open Smart Assignment page\n2. Observe listing header for AI score recommendations",
                "data": "N/A",
                "expected": "List displays recommended vehicles with score break downs",
                "priority": "High"
            },
            {
                "id": "TC-SMART-002",
                "case": "Verify Proximity Update on Map Click",
                "steps": "1. Click on client pickup spot via Map\n2. Check recommendations tier list",
                "data": "Map click trigger",
                "expected": "Proximity recalculates; AI score updates to favor closer vehicles",
                "priority": "High"
            }
        ]
    },
    "Notifications & Settings": {
        "scenario": "Validate User Preferences and alerts",
        "cases": [
            {
                "id": "TC-NOTIF-001",
                "case": "Verify Real-time notification badge status",
                "steps": "1. Simulation: Driver submits damaged inspection\n2. Manager views dashboard",
                "data": "N/A",
                "expected": "Red dot triggers on notification bell center",
                "priority": "High"
            },
            {
                "id": "TC-LANG-001",
                "case": "Verify Language Switch triggers layout switch",
                "steps": "1. Click Language Menu\n2. Select Sinhala (සිංහල)",
                "data": "Switch to SI",
                "expected": "Texts update to SI nodes instantly via i18next",
                "priority": "High"
            }
        ]
    },
    "Error Handling": {
        "scenario": "Validate System Resiliency and Fallbacks",
        "cases": [
            {
                "id": "TC-ERR-001",
                "case": "Verify Fallback on API failure response (500)",
                "steps": "1. Open page triggers API that fails\n2. View error prompt",
                "data": "API Simulate fail",
                "expected": "App does not crash or infinite loop; Shows 'Something went wrong' UI banner",
                "priority": "Medium"
            },
            {
                "id": "TC-ERR-002",
                "case": "Verify Unauthenticated Redirect",
                "steps": "1. Clear LocalStorage token\n2. Try navigating to /manager/dashboard",
                "data": "N/A",
                "expected": "App identifies missing auth state, redirects user back to Login page",
                "priority": "High"
            }
        ]
    }
}

for sheet_name, data in sheets_data.items():
    scenario = data["scenario"]
    cases = data["cases"]
    
    xml_content += f""" <Worksheet ss:Name="{esc(sheet_name)}">
  <Table ss:ExpandedColumnCount="9" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="15">
   <Column ss:Width="120"/> <!-- Test Scenario -->
   <Column ss:Width="80"/>  <!-- Test Case ID -->
   <Column ss:Width="160"/> <!-- Test Case -->
   <Column ss:Width="180"/> <!-- Test Steps -->
   <Column ss:Width="120"/> <!-- Test Data -->
   <Column ss:Width="150"/> <!-- Expected Result -->
   <Column ss:Width="80"/>  <!-- Actual Result -->
   <Column ss:Width="60"/>  <!-- Status -->
   <Column ss:Width="60"/>  <!-- Priority -->

   <Row ss:Height="25">
    <Cell ss:StyleID="Header"><Data ss:Type="String">Test Scenario</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Test Case ID</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Test Case</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Test Steps</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Test Data</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Expected Result</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Actual Result</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Status</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Priority</Data></Cell>
   </Row>
"""
    
    for case in cases:
        p_style = "CellNormal"
        if case["priority"] == "High":
             p_style = "HighPriority"
        elif case["priority"] == "Medium":
             p_style = "MediumPriority"
             
        xml_content += f"""   <Row ss:AutoFitHeight="1">
    <Cell ss:StyleID="CellNormal"><Data ss:Type="String">{esc(scenario)}</Data></Cell>
    <Cell ss:StyleID="CellNormal"><Data ss:Type="String">{esc(case["id"])}</Data></Cell>
    <Cell ss:StyleID="CellNormal"><Data ss:Type="String">{esc(case["case"])}</Data></Cell>
    <Cell ss:StyleID="CellNormal"><Data ss:Type="String">{esc(case["steps"])}</Data></Cell>
    <Cell ss:StyleID="CellNormal"><Data ss:Type="String">{esc(case["data"])}</Data></Cell>
    <Cell ss:StyleID="CellNormal"><Data ss:Type="String">{esc(case["expected"])}</Data></Cell>
    <Cell ss:StyleID="CellNormal"><Data ss:Type="String"></Data></Cell>
    <Cell ss:StyleID="CellNormal"><Data ss:Type="String"></Data></Cell>
    <Cell ss:StyleID="{p_style}"><Data ss:Type="String">{esc(case["priority"])}</Data></Cell>
   </Row>
"""
    
    xml_content += """  </Table>
 </Worksheet>
"""

xml_content += "</Workbook>"

with open(target_file, "w", encoding="utf-8") as f:
    f.write(xml_content)

print(f"File generated successfully at: {target_file}")
