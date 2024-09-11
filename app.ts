import express, { Request, Response } from 'express';
import prisma  from './prisma/prisma';


const app = express();
app.use(express.json());

// Get all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Create a user
app.post('/users', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Get all vehicles
app.get('/vehicles', async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vehicles' });
  }
});

// Create a vehicle
app.post('/vehicles', async (req: Request, res: Response) => {
  const { driverId, phoneNumber, vehicleType } = req.body;
  try {
    const newVehicle = await prisma.vehicle.create({
      data: { driverId, phoneNumber, vehicleType },
    });
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: 'Error creating vehicle' });
  }
});

// Get all requests
app.get('/requests', async (req: Request, res: Response) => {
  try {
    const requests = await prisma.request.findMany();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching requests' });
  }
});

// Create a request
app.post('/requests', async (req: Request, res: Response) => {
  const { userId, title, description, status, type, urgency } = req.body;
  try {
    const newRequest = await prisma.request.create({
      data: { userId, title, description, status, type, urgency },
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: 'Error creating request' });
  }
});

// Get all vehicle metrics
app.get('/vehicle-metrics', async (req: Request, res: Response) => {
  try {
    const metrics = await prisma.obd.findMany();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vehicle metrics' });
  }
});

// Create a new vehicle metrics entry
app.post('/vehicle-metrics', async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newMetrics = await prisma.obd.create({
      data: {
        engineRpm: data.Engine_rpm,
        vehicleSpeed: data.Vehicle_speed,
        throttlePosition: data.throttle_position,
        fuelLevel: data.fuel_level,
        engineLoad: data.engine_load,
        intakeAirTemperature: data.intake_air_temperature,
        massAirFlow: data.mass_air_flow,
        fuelPressure: data.fuel_pressure,
        fuelConsumptionRate: data.fuel_consumption_rate,
        engineCoolantTemperature: data.engine_coolant_temperature,
        oxygenSensorReading: data.oxygen_sensor_reading,
        catalystTemperature: data.catalyst_temperature,
        evapEmissionControlPressure: data.evap_emission_control_pressure,
        diagnosticTroubleCode: data.diagnostic_trouble_code,
        batteryVoltage: data.battery_voltage,
        transmissionFluidTemperature: data.transmission_fluid_temperature,
        oilTemperature: data.oil_temperature,
        brakePedalPosition: data.brake_pedal_position,
        steeringAngle: data.steering_angle,
        acceleratorPedalPosition: data.accelerator_pedal_position,
        absStatus: data.abs_status,
        airbagDeploymentStatus: data.airbag_deployment_status,
        tirePressure: data.tire_pressure,
        gpsCoordinates: data.gps_coordinates,
        altitude: data.altitude,
        heading: data.heading,
        distanceTraveled: data.distance_travelled,
        time: new Date(data.time),
      },
    });
    res.status(201).json(newMetrics);
  } catch (error) {
    res.status(500).json({ error: 'Error creating vehicle metrics entry' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
