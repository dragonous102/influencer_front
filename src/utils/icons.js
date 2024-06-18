import { findBestMatch } from 'string-similarity';

export const IconSearch = (iconString) => {
  let defaultIcon = 'note.svg';
  let iconArray = [
    {
      title: 'Accident',
      icon: 'accident.svg',
      iconpng: 'accident.png',
    },
    {
      title: 'Emergency Visit for Dog Bite',
      icon: 'dog_attack.png',
      iconpng: 'dog_attack.png',
    },
    {
      title: 'ER visit',
      icon: 'hospital.svg',
      iconpng: 'hospital.png',
    },
    {
      title: 'ED VisitED Visit for Headache and Syncope	',
      icon: 'hospital.svg',
      iconpng: 'hospital.png',
    },
    {
      title: 'Emergency department visit',
      icon: 'hospital.svg',
      iconpng: 'hospital.png',
    },
    {
      title: 'ER Follow up Visit',
      icon: 'note.svg',
      iconpng: 'note.png',
    },

    {
      title: 'x-ray Left Knee',
      icon: 'x-ray-knee.svg',
      iconpng: 'x-ray-knee.png',
    },
    {
      title: 'Pain Management Follow up Visit',
      icon: 'note.svg',
      iconpng: 'note.png',
    },
    {
      title: 'EKG',
      icon: 'ekg.svg',
      iconpng: 'ekg.png',
    },
    {
      title: 'Family Medicine Follow up Visit',
      icon: 'note.svg',
      iconpng: 'note.png',
    },
    {
      title: 'Initial Plastic Surgery Consultation',
      icon: 'note.svg',
      iconpng: 'note.png',
    },
    {
      title: 'Initial Family Medicine Consultation',
      icon: 'note.svg',
      iconpng: 'note.png',
    },
    {
      title: 'Initial Orthopedic Consultation',
      icon: 'note.svg',
      iconpng: 'note.png',
    },
    {
      title: 'Initial Neurology Evaluation',
      icon: 'note.svg',
      iconpng: 'note.png',
    },
    {
      title: 'Pelvic ultrasound',
      icon: 'pelvic.svg',
      iconpng: 'pelvic.png',
    },
    {
      title: 'Initial Family Medicine Evaluation',
      icon: 'note.svg',
      iconpng: 'note.png',
    },
    {
      title: 'Initial Chiropractic Treatment Plan ',
      icon: 'massage.svg',
      iconpng: 'massage.png',
    },
    {
      title: 'Initial Chiropractic Evaluation',
      icon: 'massage.svg',
      iconpng: 'massage.png',
    },
    {
      title: 'Chiropractic Daily Note',
      icon: 'massage.svg',
      iconpng: 'massage.png',
    },
    {
      title: 'Final Chiropractic Evaluation',
      icon: 'massage.svg',
      iconpng: 'massage.png',
    },
    {
      title: 'MRI Left Knee',
      icon: 'mri-left-knee.svg',
      iconpng: 'mri-left-knee.png',
    },
    {
      title: 'Initial Physical Therapy Evaluation',
      icon: 'therapy.svg',
      iconpng: 'therapy.png',
    },
    {
      title: 'Physical Therapy Progress Note',
      icon: 'therapy.svg',
      iconpng: 'therapy.png',
    },
    {
      title: 'X-ray Left Shoulder',
      icon: 'x-ray-left-shoulder.svg',
      iconpng: 'x-ray-left-shoulder.png',
    },
    {
      title: 'X-ray Left Hand',
      icon: 'x-ray-left-hand.svg',
      iconpng: 'x-ray-left-hand.png',
    },
    {
      title: 'X-ray Lumbosacral Spine',
      icon: 'x-ray-lumbosacral.svg',
      iconpng: 'x-ray-lumbosacral.png',
    },
    {
      title: 'Initial PM Consultation',
      icon: 'note.svg',
      iconpng: 'note.png',
    },
    {
      title: 'MRI Lumbar Spine',
      icon: 'mri-lumbar-spine.svg',
      iconpng: 'mri-lumbar-spine.png',
    },
    {
      title: 'MRI Left Shoulder',
      icon: 'mri-left-shoulder.svg',
      iconpng: 'mri-left-shoulder.png',
    },
    // {
    //   title: 'MRI Brain',
    //   icon: 'mri-brain.svg',
    //   iconpng: 'mri-brain.png',
    // },
    {
      title: 'EMG/NCV',
      icon: 'emg.svg',
      iconpng: 'emg.png',
    },
    {
      title: 'Right LESI at L1-L2',
      icon: 'esi.svg',
      iconpng: 'esi.png',
    },
    {
      title: 'Left Subacromial Bursa Injection',
      icon: 'left-shoulder-injection.svg',
      iconpng: 'left-shoulder-injection.png',
    },
    {
      title: 'X-ray Right Ankle',
      icon: 'x-ray-ankle.svg',
      iconpng: 'x-ray-ankle.png',
    },
    {
      title: 'X-ray Cervical Spine',
      icon: 'cervical-spine.svg',
      iconpng: 'cervical-spine.png',
    },
    {
      title: 'ENG Vestibular Autorotation Report',
      icon: 'eng.svg',
      iconpng: 'eng.png',
    },
    {
      title: 'eeg',
      icon: 'eeg.svg',
      iconpng: 'eeg.png',
    },
    {
      title: 'X-ray Chest',
      icon: 'x-ray-chest.svg',
      iconpng: 'x-ray-chest.png',
    },
    {
      title: 'SCS Implantation',
      icon: 'scs.svg',
      iconpng: 'scs.png',
    },
    {
      title: 'Pre-operative Evaluation',
      icon: 'note.svg',
      iconpng: 'note.png',
    },
    {
      title: 'Initial Acupuncture Evaluation',
      icon: 'acupuncture.svg',
      iconpng: 'acupuncture.png',
    },
    { title: 'Left Occipital Nerve Block Injection', icon: 'nerve.svg', iconpng: 'nerve.png' },
    { title: 'DEXA Hip and Spine', icon: 'dexa.svg', iconpng: 'dexa.png' },
    {
      title: 'covid-19 testing',
      icon: 'covid-19.svg',
      iconpng: 'covid-19.png',
    },
    {
      title: 'Initial Psychotherapy Evaluation',
      icon: 'psychotherapy.svg',
      iconpng: 'psychotherapy.png',
    },
    {
      title: 'Occupational Therapy Evaluation',
      icon: 'clinic.svg',
      iconpng: 'clinic.png',
    },
    {
      title: 'X-ray Left Foot',
      icon: 'ankle.svg',
      iconpng: 'ankle.png',
    },
    {
      title: 'X-ray Left Ankle',
      icon: 'ankle.svg',
      iconpng: 'ankle.png',
    },
    {
      title: 'X-ray Right Knee',
      icon: 'x-ray_right_knee.svg',
      iconpng: 'x-ray_right_knee.png',
    },
    {
      title: 'LHC, Coronary Angiography',
      icon: 'factory-machine.svg',
      iconpng: 'factory-machine.png',
    },
  ];
  let temp_array = [];
  iconArray.forEach((item) => {
    temp_array.push(item.title);
  });

  let object = findBestMatch(iconString, temp_array);
  return iconArray[object.bestMatchIndex];
};
