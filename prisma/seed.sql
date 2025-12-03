-- Clear existing data (if needed)
-- TRUNCATE TABLE "Patient", "Appointment", "ScheduleException", "DoctorSchedule", "Doctor", 
--              "MedicalUnit", "Location", "User", "HealthcareProvider" CASCADE;

-- Healthcare Providers
INSERT INTO "HealthcareProvider" ("id", "name", "email", "phone", "logo_url", "website", "is_verified", "created_at", "updated_at")
VALUES
  ('clp1a0001', 'Metropolitan Medical Center', 'contact@metropolitanmed.com', '+902125551000', 'https://example.com/logos/metropolitan.png', 'https://metropolitanmed.com', true, NOW(), NOW()),
  ('clp1a0002', 'Central Hospital Group', 'info@centralhospital.com', '+902125552000', 'https://example.com/logos/central.png', 'https://centralhospital.com', true, NOW(), NOW()),
  ('clp1a0003', 'New Age Health Services', 'contact@newagehealth.com', '+902125553000', 'https://example.com/logos/newage.png', 'https://newagehealth.com', false, NOW(), NOW());

-- Medical Units
INSERT INTO "MedicalUnit" ("id", "name_tr", "name_en", "description_tr", "description_en", "created_at", "updated_at")
VALUES
  ('clp1b0001', 'Kulak Burun Boğaz', 'Otorhinolaryngology', 'Kulak Burun Boğaz bölümü, kulak, burun ve boğaz ile ilgili hastalıkların teşhisi ve tedavisi ile ilgilenir.', 'The ear, nose, and throat department deals with diagnosing and treating disorders related to the ear, nose, and throat.', NOW(), NOW()),
  ('clp1b0002', 'Nöroloji', 'Neurology', 'Nöroloji bölümü beyin, sinir sistemi ve omuriliği etkileyen bozuklukları tedavi eder.', 'Neurology treats disorders affecting the brain, nervous system, and spinal cord.', NOW(), NOW()),
  ('clp1b0003', 'Dermatoloji', 'Dermatology', 'Dermatoloji deri, saç ve tırnakların hastalıklarını tedavi eden tıp dalıdır.', 'Dermatology is the branch of medicine dealing with the skin, hair and nails.', NOW(), NOW()),
  ('clp1b0004', 'Ortopedi', 'Orthopedics', 'Ortopedi kas-iskelet sistemi hastalıklarını ve yaralanmalarını tedavi eder.', 'Orthopedics deals with conditions involving the musculoskeletal system.', NOW(), NOW()),
  ('clp1b0005', 'Pediatri', 'Pediatrics', 'Pediatri çocuk sağlığı ve hastalıkları ile ilgilenen tıp dalıdır.', 'Pediatrics is the branch of medicine dealing with children and their diseases.', NOW(), NOW());

-- Locations
INSERT INTO "Location" ("id", "provider_id", "city", "address", "district", "postal_code", "latitude", "longitude", "created_at", "updated_at")
VALUES
  ('clp1c0001', 'clp1a0001', 'İstanbul', 'Acıbadem Mah. Tekin Sk. No:8', 'Kadıköy', '34718', 40.9825, 29.0554, NOW(), NOW()),
  ('clp1c0002', 'clp1a0001', 'İstanbul', 'Atatürk Cad. No:24', 'Beşiktaş', '34353', 41.0422, 29.0059, NOW(), NOW()),
  ('clp1c0003', 'clp1a0002', 'İstanbul', 'Bağdat Cad. No:102', 'Maltepe', '34840', 40.9392, 29.1361, NOW(), NOW()),
  ('clp1c0004', 'clp1a0003', 'İstanbul', 'İstiklal Cad. No:56', 'Beyoğlu', '34435', 41.0347, 28.9835, NOW(), NOW());

-- Doctors
INSERT INTO "Doctor" ("id", "provider_id", "medical_unit_id", "location_id", "first_name", "last_name", "title", "email", "phone", "photo_url", "bio", "is_active", "created_at", "updated_at")
VALUES
  ('clp1d0001', 'clp1a0001', 'clp1b0001', 'clp1c0001', 'Ali', 'Yılmaz', 'Prof. Dr.', 'ali.yilmaz@metropolitanmed.com', '+905321112233', 'https://example.com/doctors/aliyilmaz.jpg', 'Uzun yıllar kardiyoloji alanında çalışmış, özellikle kalp yetmezliği konusunda deneyimli bir hekimdir.', true, NOW(), NOW()),
  ('clp1d0002', 'clp1a0001', 'clp1b0002', 'clp1c0001', 'Ayşe', 'Kaya', 'Doç. Dr.', 'ayse.kaya@metropolitanmed.com', '+905322223344', 'https://example.com/doctors/aysekaya.jpg', 'Nöroloji uzmanı, baş ağrısı ve migren tedavilerinde uzmanlaşmıştır.', true, NOW(), NOW()),
  ('clp1d0003', 'clp1a0001', 'clp1b0003', 'clp1c0002', 'Mehmet', 'Demir', 'Uzm. Dr.', 'mehmet.demir@metropolitanmed.com', '+905323334455', 'https://example.com/doctors/mehmetdemir.jpg', 'Dermatoloji uzmanı, 10 yıllık tecrübeye sahiptir.', true, NOW(), NOW()),
  ('clp1d0004', 'clp1a0002', 'clp1b0004', 'clp1c0003', 'Zeynep', 'Şahin', 'Prof. Dr.', 'zeynep.sahin@centralhospital.com', '+905324445566', 'https://example.com/doctors/zeynepsahin.jpg', 'Ortopedi cerrahı, spor yaralanmaları konusunda uzmanlaşmıştır.', true, NOW(), NOW()),
  ('clp1d0005', 'clp1a0002', 'clp1b0005', 'clp1c0003', 'Kemal', 'Özdemir', 'Uzm. Dr.', 'kemal.ozdemir@centralhospital.com', '+905325556677', 'https://example.com/doctors/kemalozdemir.jpg', 'Pediatri uzmanı, çocuk astım hastalıkları konusunda deneyimlidir.', true, NOW(), NOW()),
  ('clp1d0006', 'clp1a0003', 'clp1b0001', 'clp1c0004', 'Selin', 'Aydın', 'Doç. Dr.', 'selin.aydin@newagehealth.com', '+905326667788', 'https://example.com/doctors/selinaydin.jpg', 'Kardiyoloji uzmanı, kalp ritim bozuklukları konusunda uzmanlaşmıştır.', true, NOW(), NOW());

-- Users
INSERT INTO "User" ("id", "name", "email", "emailVerified", "image", "password", "role", "provider_id", "doctor_id", "createdAt", "updatedAt")
VALUES
  ('clp1e0001', 'Admin User', 'admin@healthapp.com', NOW(), 'https://example.com/avatars/admin.jpg', '$2a$10$qzKX3JHBLtoO/OoPOXWtA.YS5FRa.gn7hW0xLoJ2PNejAYIXDrkqa', 'ADMIN', NULL, NULL, NOW(), NOW()),  -- password: admin123
  ('clp1e0002', 'Provider Manager', 'manager@metropolitanmed.com', NOW(), 'https://example.com/avatars/manager.jpg', '$2a$10$KQDAx7kJ.nrT48mGKn.Ipe9KZ5e9T2FRTpqyDYtNbLktzvc9pRX1W', 'HCP', 'clp1a0001', NULL, NOW(), NOW()),  -- password: manager123
  ('clp1e0003', 'Ali Yılmaz', 'ali.yilmaz@metropolitanmed.com', NOW(), 'https://example.com/doctors/aliyilmaz.jpg', '$2a$10$ot8348N7ACSRIZJs67VlBuzhJDSkaSlQGXCj.90apZD2cJM14pKMi', 'PP', NULL, 'clp1d0001', NOW(), NOW()),  -- password: doctor123
  ('clp1e0004', 'Ayşe Kaya', 'ayse.kaya@metropolitanmed.com', NOW(), 'https://example.com/doctors/aysekaya.jpg', '$2a$10$ot8348N7ACSRIZJs67VlBuzhJDSkaSlQGXCj.90apZD2cJM14pKMi', 'PP', NULL, 'clp1d0002', NOW(), NOW()),  -- password: doctor123
  ('clp1e0005', 'Central Admin', 'admin@centralhospital.com', NOW(), 'https://example.com/avatars/cadmin.jpg', '$2a$10$KQDAx7kJ.nrT48mGKn.Ipe9KZ5e9T2FRTpqyDYtNbLktzvc9pRX1W', 'HCP', 'clp1a0002', NULL, NOW(), NOW());  -- password: manager123

-- Doctor Schedules
INSERT INTO "DoctorSchedule" ("id", "doctor_id", "day_of_week", "start_time", "end_time", "appointment_duration", "is_active", "created_at", "updated_at")
VALUES
  ('clp1f0001', 'clp1d0001', 1, '09:00', '17:00', 30, true, NOW(), NOW()),  -- Monday
  ('clp1f0002', 'clp1d0001', 3, '09:00', '17:00', 30, true, NOW(), NOW()),  -- Wednesday
  ('clp1f0003', 'clp1d0001', 5, '09:00', '13:00', 30, true, NOW(), NOW()),  -- Friday
  ('clp1f0004', 'clp1d0002', 2, '10:00', '18:00', 45, true, NOW(), NOW()),  -- Tuesday
  ('clp1f0005', 'clp1d0002', 4, '10:00', '18:00', 45, true, NOW(), NOW()),  -- Thursday
  ('clp1f0006', 'clp1d0003', 1, '09:00', '16:00', 20, true, NOW(), NOW()),  -- Monday
  ('clp1f0007', 'clp1d0003', 2, '09:00', '16:00', 20, true, NOW(), NOW()),  -- Tuesday
  ('clp1f0008', 'clp1d0003', 3, '09:00', '16:00', 20, true, NOW(), NOW()),  -- Wednesday
  ('clp1f0009', 'clp1d0004', 1, '09:00', '17:30', 30, true, NOW(), NOW()),  -- Monday
  ('clp1f0010', 'clp1d0004', 4, '09:00', '17:30', 30, true, NOW(), NOW()),  -- Thursday
  ('clp1f0011', 'clp1d0005', 2, '08:30', '16:30', 25, true, NOW(), NOW()),  -- Tuesday
  ('clp1f0012', 'clp1d0005', 5, '08:30', '16:30', 25, true, NOW(), NOW()),  -- Friday
  ('clp1f0013', 'clp1d0006', 1, '10:00', '18:00', 40, true, NOW(), NOW()),  -- Monday
  ('clp1f0014', 'clp1d0006', 4, '10:00', '18:00', 40, true, NOW(), NOW());  -- Thursday

-- Schedule Exceptions (some holidays or time off)
INSERT INTO "ScheduleException" ("id", "schedule_id", "date", "exception_type", "start_time", "end_time", "reason", "created_at", "updated_at")
VALUES
  ('clp1g0001', 'clp1f0001', '2025-03-15', 'FULL_DAY', NULL, NULL, 'Personal day off', NOW(), NOW()),
  ('clp1g0002', 'clp1f0004', '2025-03-18', 'PARTIAL_DAY', '14:00', '18:00', 'Conference attendance', NOW(), NOW()),
  ('clp1g0003', 'clp1f0009', '2025-03-31', 'FULL_DAY', NULL, NULL, 'Hospital meeting', NOW(), NOW());

-- Patients
INSERT INTO "Patient" ("id", "first_name", "last_name", "email", "phone", "created_at", "updated_at")
VALUES
  ('clp1h0001', 'Hakan', 'Şimşek', 'hakan.simsek@example.com', '+905361112233', NOW(), NOW()),
  ('clp1h0002', 'Fatma', 'Çelik', 'fatma.celik@example.com', '+905362223344', NOW(), NOW()),
  ('clp1h0003', 'Emre', 'Yıldız', 'emre.yildiz@example.com', '+905363334455', NOW(), NOW()),
  ('clp1h0004', 'Deniz', 'Kurt', 'deniz.kurt@example.com', '+905364445566', NOW(), NOW()),
  ('clp1h0005', 'Sibel', 'Kara', 'sibel.kara@example.com', '+905365556677', NOW(), NOW()),
  ('clp1h0006', 'Berk', 'Öztürk', 'berk.ozturk@example.com', '+905366667788', NOW(), NOW()),
  ('clp1h0007', 'Canan', 'Aksoy', 'canan.aksoy@example.com', '+905367778899', NOW(), NOW());

-- Appointments
INSERT INTO "Appointment" ("id", "doctor_id", "patient_id", "start_time", "end_time", "status", "notes", "created_at", "updated_at")
VALUES
  ('clp1i0001', 'clp1d0001', 'clp1h0001', '2025-03-10 10:00:00', '2025-03-10 10:30:00', 'CONFIRMED', 'Regular checkup', NOW(), NOW()),
  ('clp1i0002', 'clp1d0001', 'clp1h0002', '2025-03-10 11:00:00', '2025-03-10 11:30:00', 'CONFIRMED', 'Follow-up appointment', NOW(), NOW()),
  ('clp1i0003', 'clp1d0002', 'clp1h0003', '2025-03-11 10:45:00', '2025-03-11 11:30:00', 'CONFIRMED', 'New patient consultation', NOW(), NOW()),
  ('clp1i0004', 'clp1d0002', 'clp1h0004', '2025-03-11 14:00:00', '2025-03-11 14:45:00', 'CONFIRMED', 'Headache assessment', NOW(), NOW()),
  ('clp1i0005', 'clp1d0003', 'clp1h0005', '2025-03-10 09:20:00', '2025-03-10 09:40:00', 'CONFIRMED', 'Skin condition follow-up', NOW(), NOW()),
  ('clp1i0006', 'clp1d0004', 'clp1h0006', '2025-03-10 14:00:00', '2025-03-10 14:30:00', 'CONFIRMED', 'Knee pain assessment', NOW(), NOW()),
  ('clp1i0007', 'clp1d0005', 'clp1h0007', '2025-03-11 09:00:00', '2025-03-11 09:25:00', 'CONFIRMED', 'Child vaccination', NOW(), NOW()),
  ('clp1i0008', 'clp1d0001', 'clp1h0003', '2025-03-12 15:00:00', '2025-03-12 15:30:00', 'CANCELLED', 'Patient requested cancellation', NOW(), NOW()),
  ('clp1i0009', 'clp1d0006', 'clp1h0002', '2025-03-17 11:00:00', '2025-03-17 11:40:00', 'CONFIRMED', 'Heart checkup', NOW(), NOW());