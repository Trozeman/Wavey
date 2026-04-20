// --- Canvas ---
const canvas = document.getElementById('waveform');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// --- Settings state ---
const DEFAULTS = {
  style: 'wave',
  colorMode: 'solid',
  color: '#00ff88',
  gradientStart: '#ff0066',
  gradientEnd: '#00ccff',
  delay: 0,
  scale: 1,
  lineWidth: 2,
  bgMode: 'color',
  bgColor: '#3c3c3c',
  pulseDir: 'both',
  customEffect: 'pulse',
};

const DEFAULT_SVGS = [
  {
    "id": "1776684430248",
    "name": "heart",
    "data": "<?xml version=\"1.0\" ?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\n<svg width=\"800px\" height=\"800px\" viewBox=\"0 0 32 32\" enable-background=\"new 0 0 32 32\" id=\"Stock_cut\" version=\"1.1\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><desc/><path d=\"M28.343,17.48L16,29  L3.657,17.48C1.962,15.898,1,13.684,1,11.365v0C1,6.745,4.745,3,9.365,3h0.17c2.219,0,4.346,0.881,5.915,2.45L16,6l0.55-0.55  C18.119,3.881,20.246,3,22.465,3h0.17C27.255,3,31,6.745,31,11.365v0C31,13.684,30.038,15.898,28.343,17.48z\" fill=\"none\" stroke=\"#000000\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\"/></svg>"
  },
  {
    "id": "1776691333007",
    "name": "star-sharp",
    "data": "<?xml version=\"1.0\" encoding=\"utf-8\"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n<svg width=\"800px\" height=\"800px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n<path d=\"M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n</svg>"
  },
  {
    "id": "1776690342505",
    "name": "flower",
    "data": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n\r\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\r\n<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n<svg height=\"800px\" width=\"800px\" version=\"1.1\" id=\"_x32_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \r\n\t viewBox=\"0 0 512 512\"  xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill:#000000;}\r\n</style>\r\n<g>\r\n\t<path class=\"st0\" d=\"M204.997,485.585c15.197,11.854,32.673,20.923,51.003,26.415c18.33-5.492,35.807-14.56,51.004-26.415\r\n\t\tc-18.069-5.501-35.197-13.621-51.004-24.222C240.194,471.964,223.065,480.084,204.997,485.585z\"/>\r\n\t<path class=\"st0\" d=\"M57.592,382.273c2.359,19.139,8.304,37.895,17.39,54.737c16.85,9.095,35.606,15.04,54.746,17.398\r\n\t\tc-8.922-16.693-15.275-34.527-18.957-53.179C92.119,397.547,74.286,391.194,57.592,382.273z\"/>\r\n\t<path class=\"st0\" d=\"M382.272,454.408c19.14-2.358,37.896-8.303,54.746-17.398c9.086-16.842,15.031-35.598,17.39-54.737\r\n\t\tc-16.694,8.921-34.528,15.274-53.179,18.956C397.547,419.881,391.194,437.715,382.272,454.408z\"/>\r\n\t<path class=\"st0\" d=\"M196.859,398.809c-14.91,3.838-30.271,5.884-45.737,6.101c4.804,17.251,12.733,33.875,23.108,48.48\r\n\t\tc17.669-2.968,35.041-9.122,50.655-17.938C214.118,424.397,204.701,412.091,196.859,398.809z\"/>\r\n\t<path class=\"st0\" d=\"M287.115,435.452c15.615,8.816,32.978,14.97,50.655,17.938c10.375-14.605,18.305-31.228,23.118-48.48\r\n\t\tc-15.475-0.217-30.828-2.263-45.746-6.101C307.299,412.091,297.89,424.397,287.115,435.452z\"/>\r\n\t<path class=\"st0\" d=\"M233.64,385.215c5.867,9.008,12.664,17.372,20.219,24.944c0.696,0.696,1.41,1.375,2.141,2.089\r\n\t\tc0.732-0.714,1.445-1.393,2.142-2.089c7.554-7.572,14.352-15.936,20.227-24.944c-7.711-3.795-15.223-8.112-22.369-12.908\r\n\t\tC248.854,377.102,241.343,381.42,233.64,385.215z\"/>\r\n\t<path class=\"st0\" d=\"M173.742,338.258c-8.433-1.671-16.788-3.925-24.918-6.702c-2.219,10.506-3.342,21.229-3.342,31.942\r\n\t\tc0,0.975,0.018,1.967,0.027,2.977c1.027,0.026,2.019,0.044,2.994,0.044c10.715,0,21.437-1.123,31.942-3.333\r\n\t\tC177.668,355.047,175.413,346.692,173.742,338.258z\"/>\r\n\t<path class=\"st0\" d=\"M338.258,338.258c-1.671,8.434-3.925,16.789-6.701,24.927c10.505,2.21,21.228,3.333,31.942,3.333\r\n\t\tc0.974,0,1.967-0.018,2.976-0.044c0.027-1.01,0.044-2.002,0.044-2.977c0-10.714-1.122-21.436-3.342-31.942\r\n\t\tC355.047,334.333,346.692,336.587,338.258,338.258z\"/>\r\n\t<path class=\"st0\" d=\"M398.809,315.142c3.838,14.909,5.883,30.27,6.101,45.728c17.251-4.796,33.875-12.724,48.48-23.1\r\n\t\tc-2.968-17.668-9.13-35.04-17.938-50.655C424.398,297.882,412.091,307.299,398.809,315.142z\"/>\r\n\t<path class=\"st0\" d=\"M107.107,360.87c0.2-15.458,2.245-30.82,6.084-45.728c-13.282-7.842-25.589-17.26-36.642-28.026\r\n\t\tc-8.808,15.615-14.97,32.987-17.938,50.655C73.215,348.146,89.839,356.074,107.107,360.87z\"/>\r\n\t<path class=\"st0\" d=\"M213.831,355.508c5.735-2.776,11.341-5.761,16.859-8.869c-3.081-3.16-6.145-6.388-9.13-9.722\r\n\t\tc-4.465,0.208-8.913,0.348-13.29,0.435C209.941,343.48,211.811,349.538,213.831,355.508z\"/>\r\n\t<path class=\"st0\" d=\"M281.31,346.639c5.509,3.108,11.15,6.093,16.859,8.869c2.019-5.97,3.89-12.028,5.562-18.156\r\n\t\tc-4.378-0.086-8.825-0.226-13.265-0.435C287.454,340.251,284.391,343.48,281.31,346.639z\"/>\r\n\t<path class=\"st0\" d=\"M0,256c5.492,18.33,14.552,35.807,26.416,51.004c5.501-18.078,13.621-35.19,24.222-51.004\r\n\t\tc-10.601-15.814-18.721-32.926-24.222-51.003C14.552,220.193,5.492,237.671,0,256z\"/>\r\n\t<path class=\"st0\" d=\"M485.584,204.997c-5.501,18.077-13.63,35.197-24.222,51.003c10.592,15.805,18.722,32.925,24.222,51.004\r\n\t\tC497.448,291.807,506.508,274.33,512,256C506.508,237.671,497.448,220.193,485.584,204.997z\"/>\r\n\t<path class=\"st0\" d=\"M156.491,298.169c5.962,2.019,12.028,3.89,18.156,5.562c0.087-4.378,0.226-8.826,0.435-13.29\r\n\t\tc-3.281-2.977-6.528-6.023-9.722-9.13C162.253,286.819,159.268,292.459,156.491,298.169z\"/>\r\n\t<path class=\"st0\" d=\"M337.344,303.731c6.11-1.671,12.185-3.543,18.156-5.562c-2.785-5.71-5.762-11.35-8.895-16.859\r\n\t\tc-3.16,3.081-6.406,6.144-9.661,9.13C337.178,294.905,337.284,299.353,337.344,303.731z\"/>\r\n\t<path class=\"st0\" d=\"M300.754,211.246c-14.222-7.668-29.271-13.899-44.754-18.547c-15.484,4.648-30.532,10.879-44.753,18.547\r\n\t\tc-7.668,14.222-13.909,29.27-18.548,44.754c4.639,15.484,10.88,30.532,18.548,44.754c14.222,7.668,29.27,13.9,44.753,18.547\r\n\t\tc15.484-4.647,30.532-10.879,44.754-18.547c7.668-14.222,13.9-29.27,18.548-44.754\r\n\t\tC314.654,240.516,308.422,225.467,300.754,211.246z\"/>\r\n\t<path class=\"st0\" d=\"M372.306,256c4.796,7.146,9.113,14.648,12.908,22.368c9.008-5.875,17.39-12.673,24.944-20.228\r\n\t\tc0.696-0.696,1.375-1.41,2.089-2.14c-0.714-0.731-1.393-1.445-2.089-2.141c-7.554-7.555-15.936-14.353-24.944-20.228\r\n\t\tC381.419,241.352,377.102,248.855,372.306,256z\"/>\r\n\t<path class=\"st0\" d=\"M101.842,253.859c-0.679,0.696-1.375,1.41-2.089,2.141c0.714,0.731,1.392,1.444,2.089,2.14\r\n\t\tc7.554,7.555,15.936,14.353,24.944,20.228c3.795-7.72,8.111-15.222,12.907-22.368c-4.796-7.145-9.112-14.648-12.907-22.369\r\n\t\tC117.777,239.507,109.396,246.304,101.842,253.859z\"/>\r\n\t<path class=\"st0\" d=\"M355.5,213.831c-5.971-2.02-12.046-3.891-18.156-5.562c-0.06,4.379-0.166,8.826-0.4,13.291\r\n\t\tc3.255,2.985,6.502,6.049,9.661,9.13C349.738,225.181,352.715,219.541,355.5,213.831z\"/>\r\n\t<path class=\"st0\" d=\"M174.647,208.269c-6.128,1.671-12.194,3.543-18.156,5.562c2.776,5.709,5.762,11.349,8.869,16.859\r\n\t\tc3.194-3.108,6.441-6.154,9.722-9.13C174.874,217.095,174.734,212.648,174.647,208.269z\"/>\r\n\t<path class=\"st0\" d=\"M404.91,151.13c-0.218,15.458-2.263,30.82-6.101,45.73c13.282,7.842,25.589,17.259,36.642,28.025\r\n\t\tc8.808-15.615,14.97-32.987,17.938-50.655C438.785,163.854,422.161,155.926,404.91,151.13z\"/>\r\n\t<path class=\"st0\" d=\"M107.107,151.13c-17.268,4.796-33.892,12.724-48.497,23.1c2.968,17.668,9.13,35.04,17.938,50.655\r\n\t\tc11.053-10.775,23.36-20.183,36.642-28.025C109.352,181.949,107.307,166.588,107.107,151.13z\"/>\r\n\t<path class=\"st0\" d=\"M363.499,145.481c-10.714,0-21.437,1.123-31.942,3.333c2.776,8.138,5.03,16.494,6.701,24.927\r\n\t\tc8.434,1.671,16.79,3.925,24.918,6.702c2.22-10.505,3.342-21.229,3.342-31.942c0-0.975-0.017-1.967-0.044-2.977\r\n\t\tC365.466,145.499,364.473,145.481,363.499,145.481z\"/>\r\n\t<path class=\"st0\" d=\"M173.742,173.742c1.671-8.434,3.926-16.789,6.702-24.927c-10.505-2.21-21.228-3.333-31.942-3.333\r\n\t\tc-0.975,0-1.967,0.018-2.994,0.044c-0.009,1.01-0.027,2.002-0.027,2.977c0,10.714,1.123,21.437,3.342,31.942\r\n\t\tC156.953,177.667,165.308,175.413,173.742,173.742z\"/>\r\n\t<path class=\"st0\" d=\"M298.169,156.492c-5.709,2.776-11.35,5.762-16.859,8.869c3.081,3.16,6.144,6.388,9.156,9.722\r\n\t\tc4.44-0.208,8.887-0.348,13.265-0.435C302.06,168.52,300.188,162.462,298.169,156.492z\"/>\r\n\t<path class=\"st0\" d=\"M230.69,165.361c-5.518-3.107-11.124-6.092-16.859-8.869c-2.02,5.97-3.89,12.028-5.561,18.156\r\n\t\tc4.378,0.086,8.825,0.226,13.29,0.435C224.545,171.749,227.609,168.52,230.69,165.361z\"/>\r\n\t<path class=\"st0\" d=\"M278.368,126.786c-5.875-9.009-12.673-17.373-20.227-24.945c-0.697-0.696-1.41-1.392-2.142-2.088\r\n\t\tc-0.731,0.696-1.445,1.392-2.141,2.088c-7.555,7.572-14.352,15.936-20.219,24.945c7.703,3.794,15.214,8.112,22.36,12.907\r\n\t\tC263.146,134.898,270.657,130.581,278.368,126.786z\"/>\r\n\t<path class=\"st0\" d=\"M129.728,57.592c-19.14,2.358-37.896,8.303-54.746,17.398c-9.086,16.842-15.031,35.598-17.39,54.737\r\n\t\tc16.694-8.92,34.527-15.274,53.179-18.956C114.453,92.137,120.806,74.285,129.728,57.592z\"/>\r\n\t<path class=\"st0\" d=\"M382.272,57.592c8.922,16.693,15.275,34.527,18.957,53.179c18.651,3.682,36.485,10.036,53.179,18.956\r\n\t\tc-2.359-19.139-8.304-37.895-17.39-54.737C420.168,65.895,401.412,59.951,382.272,57.592z\"/>\r\n\t<path class=\"st0\" d=\"M315.141,113.191c14.909-3.838,30.272-5.884,45.746-6.084c-4.813-17.268-12.742-33.892-23.118-48.497\r\n\t\tc-17.677,2.969-35.04,9.122-50.655,17.938C297.882,87.603,307.299,99.909,315.141,113.191z\"/>\r\n\t<path class=\"st0\" d=\"M224.884,76.548c-15.614-8.816-32.986-14.969-50.655-17.938c-10.374,14.605-18.304,31.229-23.108,48.48\r\n\t\tc15.466,0.217,30.828,2.263,45.737,6.101C204.701,99.909,214.118,87.603,224.884,76.548z\"/>\r\n\t<path class=\"st0\" d=\"M307.003,26.415C291.806,14.562,274.33,5.492,256,0.001c-18.33,5.492-35.806,14.561-51.003,26.415\r\n\t\tc18.068,5.501,35.197,13.622,51.003,24.222C271.806,40.037,288.934,31.916,307.003,26.415z\"/>\r\n</g>\r\n</svg>"
  },
  {
    "id": "1776690198653",
    "name": "car",
    "data": "<?xml version=\"1.0\" encoding=\"utf-8\"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n<svg width=\"800px\" height=\"800px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n<path d=\"M8 17H16M8 17C8 18.1046 7.10457 19 6 19C4.89543 19 4 18.1046 4 17M8 17C8 15.8954 7.10457 15 6 15C4.89543 15 4 15.8954 4 17M16 17C16 18.1046 16.8954 19 18 19C19.1046 19 20 18.1046 20 17M16 17C16 15.8954 16.8954 15 18 15C19.1046 15 20 15.8954 20 17M10 5V11M4 11L4.33152 9.01088C4.56901 7.58593 4.68776 6.87345 5.0433 6.3388C5.35671 5.8675 5.79705 5.49447 6.31346 5.26281C6.8993 5 7.6216 5 9.06621 5H12.4311C13.3703 5 13.8399 5 14.2662 5.12945C14.6436 5.24406 14.9946 5.43194 15.2993 5.68236C15.6435 5.96523 15.904 6.35597 16.425 7.13744L19 11M4 17H3.6C3.03995 17 2.75992 17 2.54601 16.891C2.35785 16.7951 2.20487 16.6422 2.10899 16.454C2 16.2401 2 15.9601 2 15.4V14.2C2 13.0799 2 12.5198 2.21799 12.092C2.40973 11.7157 2.71569 11.4097 3.09202 11.218C3.51984 11 4.0799 11 5.2 11H17.2C17.9432 11 18.3148 11 18.6257 11.0492C20.3373 11.3203 21.6797 12.6627 21.9508 14.3743C22 14.6852 22 15.0568 22 15.8C22 15.9858 22 16.0787 21.9877 16.1564C21.9199 16.5843 21.5843 16.9199 21.1564 16.9877C21.0787 17 20.9858 17 20.8 17H20\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n</svg>"
  }
]
// bgImage stored separately — can be several MB as base64
let bgImage = localStorage.getItem('sw-bg-image') || null;

function loadSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem('sw-settings') || '{}');
    return { ...DEFAULTS, ...stored };
  } catch {
    return { ...DEFAULTS };
  }
}

function saveSettings() {
  localStorage.setItem('sw-settings', JSON.stringify(settings));
}

const settings = loadSettings();

function updateImagePreview() {
  const has = !!bgImage;
  document.getElementById('bg-no-image').classList.toggle('hidden', has);
  document.getElementById('bg-preview-img').classList.toggle('hidden', !has);
  document.getElementById('bg-clear').classList.toggle('hidden', !has);
  if (has) document.getElementById('bg-preview-img').src = bgImage;
}

function applyBackground() {
  if (settings.bgMode === 'image' && bgImage) {
    document.body.style.backgroundImage    = `url(${bgImage})`;
    document.body.style.backgroundSize     = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundColor   = '';
  } else {
    document.body.style.backgroundImage    = '';
    document.body.style.backgroundSize     = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundColor   = settings.bgColor;
  }
}

// Sync all UI controls to the loaded values
function applySettingsToUI() {
  document.querySelectorAll('[data-style]').forEach(b => {
    b.classList.toggle('active', b.dataset.style === settings.style);
  });
  document.querySelectorAll('[data-color-mode]').forEach(b => {
    b.classList.toggle('active', b.dataset.colorMode === settings.colorMode);
  });
  document.querySelectorAll('[data-bg-mode]').forEach(b => {
    b.classList.toggle('active', b.dataset.bgMode === settings.bgMode);
  });
  document.querySelectorAll('[data-dir]').forEach(b => {
    b.classList.toggle('active', b.dataset.dir === settings.pulseDir);
  });
  document.querySelectorAll('[data-effect]').forEach(b => {
    b.classList.toggle('active', b.dataset.effect === settings.customEffect);
  });
  document.getElementById('custom-effect-section').classList.toggle('hidden', settings.style !== 'custom');
  document.getElementById('solid-section').classList.toggle('hidden', settings.colorMode !== 'solid');
  document.getElementById('gradient-section').classList.toggle('hidden', settings.colorMode !== 'gradient');
  document.getElementById('bg-color-section').classList.toggle('hidden', settings.bgMode !== 'color');
  document.getElementById('bg-image-section').classList.toggle('hidden', settings.bgMode !== 'image');
  document.getElementById('color').value          = settings.color;
  document.getElementById('gradient-start').value = settings.gradientStart;
  document.getElementById('gradient-end').value   = settings.gradientEnd;
  document.getElementById('line-width').value           = settings.lineWidth;
  document.getElementById('line-width-val').textContent = `${settings.lineWidth} px`;
  document.getElementById('scale').value           = settings.scale;
  document.getElementById('scale-val').textContent = `${settings.scale.toFixed(1)}×`;
  document.getElementById('delay').value          = settings.delay;
  document.getElementById('delay-val').textContent = `${settings.delay} ms`;
  document.getElementById('bg-color').value       = settings.bgColor;
  updateImagePreview();
  applyBackground();
}
applySettingsToUI();

// --- Config panel UI ---
document.getElementById('config-toggle').addEventListener('click', () => {
  document.getElementById('config-panel').classList.toggle('open');
});

document.querySelectorAll('[data-style]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-style]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    settings.style = btn.dataset.style;
    document.getElementById('custom-effect-section').classList.toggle('hidden', settings.style !== 'custom');
    saveSettings();
  });
});

document.querySelectorAll('[data-effect]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-effect]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    settings.customEffect = btn.dataset.effect;
    saveSettings();
  });
});

document.querySelectorAll('[data-dir]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-dir]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    settings.pulseDir = btn.dataset.dir;
    saveSettings();
  });
});

document.querySelectorAll('[data-color-mode]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-color-mode]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    settings.colorMode = btn.dataset.colorMode;
    document.getElementById('solid-section').classList.toggle('hidden', settings.colorMode !== 'solid');
    document.getElementById('gradient-section').classList.toggle('hidden', settings.colorMode !== 'gradient');
    saveSettings();
    recolorSvg();
  });
});

document.getElementById('line-width').addEventListener('input', e => {
  settings.lineWidth = Number(e.target.value);
  document.getElementById('line-width-val').textContent = `${settings.lineWidth} px`;
  saveSettings();
});

document.getElementById('scale').addEventListener('input', e => {
  settings.scale = Number(e.target.value);
  document.getElementById('scale-val').textContent = `${settings.scale.toFixed(1)}×`;
  saveSettings();
});

document.getElementById('delay').addEventListener('input', e => {
  settings.delay = Number(e.target.value);
  document.getElementById('delay-val').textContent = `${e.target.value} ms`;
  saveSettings();
});

document.getElementById('color').addEventListener('input', e => { settings.color = e.target.value; saveSettings(); recolorSvg(); });
document.getElementById('gradient-start').addEventListener('input', e => { settings.gradientStart = e.target.value; saveSettings(); recolorSvg(); });
document.getElementById('gradient-end').addEventListener('input', e => { settings.gradientEnd = e.target.value; saveSettings(); recolorSvg(); });

document.querySelectorAll('[data-bg-mode]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-bg-mode]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    settings.bgMode = btn.dataset.bgMode;
    document.getElementById('bg-color-section').classList.toggle('hidden', settings.bgMode !== 'color');
    document.getElementById('bg-image-section').classList.toggle('hidden', settings.bgMode !== 'image');
    applyBackground();
    saveSettings();
  });
});

document.getElementById('bg-color').addEventListener('input', e => {
  settings.bgColor = e.target.value;
  applyBackground();
  saveSettings();
});

document.getElementById('bg-file').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    bgImage = ev.target.result;
    localStorage.setItem('sw-bg-image', bgImage);
    updateImagePreview();
    applyBackground();
  };
  reader.readAsDataURL(file);
});

document.getElementById('bg-clear').addEventListener('click', () => {
  bgImage = null;
  localStorage.removeItem('sw-bg-image');
  document.getElementById('bg-file').value = '';
  updateImagePreview();
  applyBackground();
});

// --- SVG Overlays ---
const SVG_KEY = 'sw-custom-svgs';

function loadSvgs() {
  try { return JSON.parse(localStorage.getItem(SVG_KEY) || '[]'); }
  catch { return []; }
}
function saveSvgs(list) {
  localStorage.setItem(SVG_KEY, JSON.stringify(list));
}

let svgList     = loadSvgs();
let activeSvgId = localStorage.getItem('sw-active-svg') || null;

function recolorSvg() {
  const svgEl = document.querySelector('#svg-overlay svg');
  if (!svgEl) return;

  let defs = svgEl.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svgEl.insertBefore(defs, svgEl.firstChild);
  }
  svgEl.querySelector('#wv-style')?.remove();
  defs.querySelector('#wv-grad')?.remove();

  const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  styleEl.id = 'wv-style';

  if (settings.colorMode === 'gradient') {
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.id = 'wv-grad';
    grad.setAttribute('gradientUnits', 'userSpaceOnUse');
    grad.setAttribute('x1', '0'); grad.setAttribute('y1', '0');
    grad.setAttribute('x2', '0'); grad.setAttribute('y2', '100%');
    const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    s1.setAttribute('offset', '0%');
    s1.setAttribute('stop-color', settings.gradientStart);
    const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    s2.setAttribute('offset', '100%');
    s2.setAttribute('stop-color', settings.gradientEnd);
    grad.append(s1, s2);
    defs.appendChild(grad);
    styleEl.textContent = `* { fill: url(#wv-grad) !important; stroke: url(#wv-grad) !important; }
      [fill="none"] { fill: none !important; } [stroke="none"] { stroke: none !important; }`;
  } else {
    styleEl.textContent = `* { fill: ${settings.color} !important; stroke: ${settings.color} !important; }
      [fill="none"] { fill: none !important; } [stroke="none"] { stroke: none !important; }`;
  }
  svgEl.appendChild(styleEl);
}

function getAmplitude(buf, isFreq) {
  let sum = 0;
  const count = Math.min(buf.length, 256);
  for (let i = 0; i < count; i++) sum += isFreq ? buf[i] / 255 : Math.abs(buf[i]);
  return sum / count;
}

function updateSvgOverlay(buf, isFreq) {
  const overlay = document.getElementById('svg-overlay');
  const svgEl = overlay.querySelector('svg');
  if (!svgEl) return;
  if (!overlay.classList.contains('hidden')) overlay.classList.add('hidden');

}

function applyActiveSvg() {
  const overlay = document.getElementById('svg-overlay');
  const item = svgList.find(s => s.id === activeSvgId);
  if (item) {
    overlay.innerHTML = item.data;
    overlay.classList.remove('hidden');
    recolorSvg();
  } else {
    overlay.innerHTML = '';
    overlay.classList.add('hidden');
    activeSvgId = null;
    localStorage.removeItem('sw-active-svg');
  }
}

function renderSvgList() {
  const container = document.getElementById('svg-list');
  container.innerHTML = '';
  if (svgList.length === 0) {
    saveSvgs(DEFAULT_SVGS);
    container.innerHTML = '<span class="svg-empty">No SVGs saved</span>';
  }
  svgList.forEach(item => {
    const row = document.createElement('div');
    row.className = 'svg-item' + (item.id === activeSvgId ? ' active' : '');

    const thumb = document.createElement('div');
    thumb.className = 'svg-thumb';
    thumb.innerHTML = item.data;
    thumb.title = 'Click to toggle overlay';
    thumb.addEventListener('click', () => {
      activeSvgId = activeSvgId === item.id ? null : item.id;
      if (activeSvgId) localStorage.setItem('sw-active-svg', activeSvgId);
      else             localStorage.removeItem('sw-active-svg');
      applyActiveSvg();
      renderSvgList();
    });

    const name = document.createElement('span');
    name.className = 'svg-name';
    name.textContent = item.name;

    const del = document.createElement('button');
    del.className = 'svg-del';
    del.textContent = '✕';
    del.title = 'Delete';
    del.addEventListener('click', () => {
      svgList = svgList.filter(s => s.id !== item.id);
      saveSvgs(svgList);
      if (activeSvgId === item.id) {
        activeSvgId = null;
        localStorage.removeItem('sw-active-svg');
        applyActiveSvg();
      }
      renderSvgList();
    });

    row.append(thumb, name, del);
    container.appendChild(row);
  });
}

document.getElementById('svg-file').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    svgList.push({
      id:   Date.now().toString(),
      name: file.name.replace(/\.svg$/i, ''),
      data: ev.target.result,
    });
    saveSvgs(svgList);
    renderSvgList();
    e.target.value = '';
  };
  reader.readAsText(file);
});

renderSvgList();
applyActiveSvg();

// --- Drawing helpers ---
function strokeStyle(x1, y1, x2, y2) {
  if (settings.colorMode === 'solid') return settings.color;
  const g = ctx.createLinearGradient(x1, y1, x2, y2);
  g.addColorStop(0, settings.gradientStart);
  g.addColorStop(1, settings.gradientEnd);
  return g;
}

function directedV(v) {
  const d = settings.pulseDir;
  if (d === 'outside') return Math.abs(v);
  if (d === 'inside')  return -Math.abs(v);
  return v;
}

function drawWave(buf) {
  const { width, height } = canvas;
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle(0, 0, width, 0);
  ctx.lineWidth = settings.lineWidth;
  const step = width / buf.length;
  for (let i = 0; i < buf.length; i++) {
    const x = i * step;
    const y = height / 2 + directedV(buf[i]) * 0.5 * height * settings.scale;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawSquare(buf) {
  const { width, height } = canvas;
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle(0, 0, width, 0);
  ctx.lineWidth = settings.lineWidth;
  const step = width / buf.length;
  let prevY = null;
  for (let i = 0; i < buf.length; i++) {
    const x = i * step;
    const y = height / 2 + directedV(buf[i]) * 0.5 * height * settings.scale;
    if (prevY === null) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, prevY); // horizontal at previous level
      ctx.lineTo(x, y);     // vertical step to new level
    }
    prevY = y;
  }
  ctx.stroke();
}

function drawBars(buf) {
  const { width, height } = canvas;
  const count = buf.length;
  const bw = width / (count * 0.5);
  const mid = height / 2;
  const dir = settings.pulseDir;

  for (let i = 0; i < count; i++) {
    const bh = Math.min(((buf[i] / 255) * height * settings.scale) / 2, mid);
    const x = i * bw;

    let y, rh;
    if (dir === 'outside')     { y = height - bh; rh = bh; }
    else if (dir === 'inside') { y = 0;            rh = bh; }
    else                       { y = mid - bh;     rh = bh * 2; }

    if (settings.colorMode === 'gradient') {
      const g = ctx.createLinearGradient(x, y, x, y + rh);
      g.addColorStop(0, settings.gradientStart);
      g.addColorStop(1, settings.gradientEnd);
      ctx.fillStyle = g;
    } else {
      ctx.fillStyle = settings.color;
    }
    ctx.fillRect(x + 0.5, y, bw - 1, rh);
  }
}

function drawCircle(buf) {
  const { width, height } = canvas;
  const cx = width / 2;
  const cy = height / 2;
  const base = Math.min(width, height) * 0.25;
  const amp  = Math.min(width, height) * 0.18;

  ctx.beginPath();
  ctx.strokeStyle = strokeStyle(cx - base, cy, cx + base, cy);
  ctx.lineWidth = settings.lineWidth;

  const len = buf.length;
  for (let i = 0; i <= len; i++) {
    const v = buf[i % len];
    const angle = (i / len) * Math.PI * 2 - Math.PI / 2;
    const r = base + directedV(v) * amp * settings.scale;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawPulse(buf) {
  const { width, height } = canvas;
  const count   = 25;
  const gap     = 7;
  const barW    = (width - (count * gap)) / count;
  const originX = gap;
  const dir     = settings.pulseDir;

  for (let i = 0; i < count; i++) {
    const norm = buf[Math.floor(i * buf.length / (count * 3))] / 255;
    const half = Math.max(3, norm * height * 0.45 * settings.scale);
    const x    = originX + i * (barW + gap);

    let y, rh;
    if (dir === 'both')        { y = height / 2 - half; rh = half * 2; }
    else if (dir === 'outside'){ y = height - half * 2; rh = half * 2; }
    else                       { y = 0;                 rh = half * 2; }

    if (settings.colorMode === 'gradient') {
      const g = ctx.createLinearGradient(x, y, x, y + rh);
      g.addColorStop(0, settings.gradientStart);
      g.addColorStop(1, settings.gradientEnd);
      ctx.fillStyle = g;
    } else {
      ctx.fillStyle = settings.color;
    }

    ctx.beginPath();
    ctx.roundRect(x, y, barW, rh, 4);
    ctx.fill();
  }
}

function drawSideBars(buf) {
  const { width, height } = canvas;
  const count = 40;
  const slotH = height / count;
  const barH  = Math.max(1, slotH - 3);
  const half  = width / 2;
  const dir   = settings.pulseDir;

  for (let i = 0; i < count; i++) {
    const norm = buf[Math.floor(i * buf.length / count)] / 255;
    const barW = Math.max(2, norm * half * settings.scale);
    const y    = i * slotH + (slotH - barH) / 2;

    const setFill = (x1, x2) => {
      if (settings.colorMode === 'gradient') {
        const g = ctx.createLinearGradient(x1, 0, x2, 0);
        g.addColorStop(0, settings.gradientStart);
        g.addColorStop(1, settings.gradientEnd);
        ctx.fillStyle = g;
      } else {
        ctx.fillStyle = settings.color;
      }
    };

    if (dir === 'outside' || dir === 'both') {
      // from left edge →
      setFill(0, barW);
      ctx.beginPath();
      ctx.roundRect(0, y, barW, barH, [0, 4, 4, 0]);
      ctx.fill();
      // from right edge ←
      setFill(width, width - barW);
      ctx.beginPath();
      ctx.roundRect(width - barW, y, barW, barH, [4, 0, 0, 4]);
      ctx.fill();
    }

    if (dir === 'inside' || dir === 'both') {
      // from center → left
      setFill(half, half - barW);
      ctx.beginPath();
      ctx.roundRect(half - barW, y, barW, barH, [4, 0, 0, 4]);
      ctx.fill();
      // from center → right
      setFill(half, half + barW);
      ctx.beginPath();
      ctx.roundRect(half, y, barW, barH, [0, 4, 4, 0]);
      ctx.fill();
    }
  }
}



function drawCustom(buf, isFreq) {
  const svgEl = document.querySelector('#svg-overlay svg');
  if (!svgEl) return;

  const pathEls = Array.from(svgEl.querySelectorAll('path'));
  if (!pathEls.length) return;

  // SVG → canvas coordinate mapping
  const vb = svgEl.viewBox?.baseVal;
  const svgW = (vb && vb.width  > 0) ? vb.width  : (parseFloat(svgEl.getAttribute('width'))  || 512);
  const svgH = (vb && vb.height > 0) ? vb.height : (parseFloat(svgEl.getAttribute('height')) || 512);
  const fitScale = Math.min(canvas.width / svgW, canvas.height / svgH) * 0.72;
  const ox = (canvas.width  - svgW * fitScale) / 2;
  const oy = (canvas.height - svgH * fitScale) / 2;

  const amp    = getAmplitude(buf, isFreq);
  const mag    = amp * settings.scale;
  const effect = settings.customEffect || 'pulse';
  const dir    = settings.pulseDir;
  const now    = Date.now();

  // Gradient in SVG coordinate space (applied after ctx.scale)
  function fillStyle() {
    if (settings.colorMode === 'solid') return settings.color;
    const g = ctx.createLinearGradient(0, 0, 0, svgH);
    g.addColorStop(0, settings.gradientStart);
    g.addColorStop(1, settings.gradientEnd);
    return g;
  }

  // Build distorted path by sampling SVGPathElement.getPointAtLength
  function buildWarpedPath(pathEl, getOffset) {
    const totalLen = pathEl.getTotalLength();
    const steps = Math.min(Math.ceil(totalLen * fitScale * 0.8), 600);
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      const dist = frac * totalLen;
      const pt   = pathEl.getPointAtLength(dist);

      // Normal direction (perpendicular to tangent)
      const a = pathEl.getPointAtLength(Math.max(0, dist - 0.8));
      const b = pathEl.getPointAtLength(Math.min(totalLen, dist + 0.8));
      const tdx = b.x - a.x, tdy = b.y - a.y;
      const tlen = Math.sqrt(tdx * tdx + tdy * tdy) || 1;
      const nx = -tdy / tlen, ny = tdx / tlen;

      const offset = getOffset(frac, pt, nx, ny);
      const x = pt.x + nx * offset;
      const y = pt.y + ny * offset;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(fitScale, fitScale);
  ctx.lineWidth   = settings.lineWidth / fitScale;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';

  pathEls.forEach(pathEl => {
    const d = pathEl.getAttribute('d');
    if (!d) return;

    ctx.strokeStyle = fillStyle();

    if (effect === 'pulse') {
      // ── Pulse: scale the path in/out from SVG centre ──────────────────
      const scBase = dir === 'outside' ? 1 + mag * 0.5
                   : dir === 'inside'  ? Math.max(0.5, 1 - mag * 0.35)
                   : 1 + (Math.sin(now * 0.004) * 0.5 + 0.5) * mag * 0.4;

      const rings = dir === 'both' ? 3 : 1;
      for (let r = 0; r < rings; r++) {
        const sc    = scBase + r * 0.12 * mag;
        const alpha = r === 0 ? 0.7 + mag * 0.6 : Math.max(0.9, (mag - 0.2) * (1 - r / rings));
        if (alpha < 0.01) continue;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(svgW / 2, svgH / 2);
        ctx.scale(sc, sc);
        ctx.translate(-svgW / 2, -svgH / 2);
        ctx.stroke(new Path2D(d));
        ctx.restore();
      }

    } else if (effect === 'wiggle') {
      // ── Wiggle: sinusoidal distortion perpendicular to path ───────────
      ctx.globalAlpha = 0.9 + mag * 0.55;
      buildWarpedPath(pathEl, (frac) => {
        const sin1 = Math.sin(frac * Math.PI * 6 + now * 0.006) * mag * 28;
        const sin2 = Math.sin(frac * Math.PI * 14 + now * 0.003) * mag * 12;
        return (sin1 + sin2) * (dir === 'inside' ? -1 : dir === 'both' ? Math.sin(now * 0.002) : 1);
      });

    } else if (effect === 'wave') {
      // ── Wave: audio buffer drives perpendicular displacement ──────────
      ctx.globalAlpha = 0.8 + mag * 0.5;
      buildWarpedPath(pathEl, (frac) => {
        const idx    = Math.floor(frac * (buf.length - 1));
        const sample = isFreq ? (buf[idx] / 255 - 0.5) * 2 : buf[idx];
        const disp   = directedV(sample) * mag * 45;
        // Add slight time-based shimmer
        const shimmer = Math.sin(frac * Math.PI * 4 + now * 0.005) * mag * 8;
        return disp + shimmer;
      });

    } else if (effect === 'spawn') {
      // ── Spawn: rings continuously expand and fade outward ─────────────
      const ringCount = 25;
      for (let r = 0; r < ringCount; r++) {
        const phase = ((now * 0.0006 + r / ringCount) % 1);
        const expand = dir === 'inside'  ? (1 - phase) * mag * 0.55
                     : dir === 'outside' ? phase * mag * 0.55
                     : (r % 2 === 0 ? phase : 1 - phase) * mag * 0.55;
        const sc    = 1 + expand;
        const alpha = (1 - phase) * mag * 0.90;
        if (alpha < 0.01) continue;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(svgW / 2, svgH / 2);
        ctx.scale(sc, sc);
        ctx.translate(-svgW / 2, -svgH / 2);
        ctx.stroke(new Path2D(d));
        ctx.restore();
      }
    }
  });

  ctx.restore();
}

// --- Decay smoothing ---
// Snaps toward louder values instantly, decays back toward 0 at the configured rate.
// k = per-frame decay factor derived from the time constant (delay ms at ~60 fps).
function applyDecay(raw, display) {
  if (settings.delay === 0) {
    for (let i = 0; i < raw.length; i++) display[i] = raw[i];
    return;
  }
  const k = Math.exp(-16.67 / settings.delay); // 16.67ms ≈ one frame at 60fps
  for (let i = 0; i < raw.length; i++) {
    if (Math.abs(raw[i]) >= Math.abs(display[i])) display[i] = raw[i];
    else display[i] *= k;
  }
}

// --- Audio ---
let audioCtx    = null;
let analyser    = null;
let curSource   = null;
let curStream   = null;

async function initAudio(deviceId) {
  const audioConstraint = deviceId ? { deviceId: { exact: deviceId } } : true;
  const stream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraint, video: false });

  // Tear down previous stream/source
  curStream?.getTracks().forEach(t => t.stop());
  curSource?.disconnect();

  if (!audioCtx) {
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
  }

  curStream = stream;
  curSource = audioCtx.createMediaStreamSource(stream);
  curSource.connect(analyser);
}

async function populateDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const select  = document.getElementById('mic-select');
  select.innerHTML = '';
  devices
    .filter(d => d.kind === 'audioinput')
    .forEach(d => {
      const opt     = document.createElement('option');
      opt.value     = d.deviceId;
      opt.textContent = d.label || 'Microphone';
      select.appendChild(opt);
    });

  // Highlight whichever device is currently active
  const activeId = curStream?.getAudioTracks()[0]?.getSettings().deviceId;
  if (activeId) select.value = activeId;

  select.addEventListener('change', () => initAudio(select.value));
}

async function start() {
  await initAudio(null);    // first call — triggers OS permission prompt
  await populateDevices();  // labels are available only after permission

  const timeBuf     = new Float32Array(analyser.fftSize);
  const freqBuf     = new Uint8Array(analyser.frequencyBinCount);
  const dispTimeBuf = new Float32Array(analyser.fftSize);
  const dispFreqBuf = new Float32Array(analyser.frequencyBinCount);

  function draw() {
    requestAnimationFrame(draw);
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    if (settings.style === 'bars' || settings.style === 'pulse' || settings.style === 'sides') {
      analyser.getByteFrequencyData(freqBuf);
      applyDecay(freqBuf, dispFreqBuf);
      if (settings.style === 'bars')       drawBars(dispFreqBuf);
      else if (settings.style === 'pulse') drawPulse(dispFreqBuf);
      else                                 drawSideBars(dispFreqBuf);
      updateSvgOverlay(dispFreqBuf, true);
    } else {
      analyser.getFloatTimeDomainData(timeBuf);
      applyDecay(timeBuf, dispTimeBuf);
      if (settings.style === 'wave')         drawWave(dispTimeBuf);
      else if (settings.style === 'custom') drawCustom(dispTimeBuf, false);
      else                                  drawCircle(dispTimeBuf);
      updateSvgOverlay(dispTimeBuf, false);
    }
  }

  draw();
}

const preload = document.getElementById('preload');

start()
  .then(() => {
    preload.classList.add('done');
    preload.addEventListener('transitionend', () => preload.remove(), { once: true });
  })
  .catch(err => {
    console.error('Mic access error:', err);
    preload.classList.add('done');
  });
