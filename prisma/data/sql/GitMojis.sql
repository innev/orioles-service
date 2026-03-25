-- ----------------------------------------
-- Export of table `GitMojis`
-- Date: 2026-03-25T14:17:10.176Z
-- Rows: 71
-- ----------------------------------------

SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;
SET AUTOCOMMIT=0;

-- Data for `GitMojis` (71 rows)
INSERT IGNORE INTO `GitMojis` (`name`, `code`, `emoji`, `entity`, `description`, `semver`, `color`) VALUES
  ('adhesive-bandage', ':adhesive_bandage:', '🩹', '&#x1FA79;', 'Simple fix for a non-critical issue.', 'patch', '#fbcfb7'),
  ('alembic', ':alembic:', '⚗️', '&#128248;', 'Perform experiments.', 'patch', '#7f39fb'),
  ('alien', ':alien:', '👽️', '&#1F47D;', 'Update code due to external API changes.', 'patch', '#c5e763'),
  ('ambulance', ':ambulance:', '🚑️', '&#128657;', 'Critical hotfix.', 'patch', '#fb584a'),
  ('animation', ':dizzy:', '💫', '&#x1f4ab;', 'Add or update animations and transitions.', 'patch', '#ffdb3a'),
  ('arrow-down', ':arrow_down:', '⬇️', '⬇️', 'Downgrade dependencies.', 'patch', '#ef5350'),
  ('arrow-up', ':arrow_up:', '⬆️', '⬆️', 'Upgrade dependencies.', 'patch', '#00e676'),
  ('art', ':art:', '🎨', '&#x1f3a8;', 'Improve structure / format of the code.', NULL, '#ff7281'),
  ('beers', ':beers:', '🍻', '&#x1f37b;', 'Write code drunkenly.', NULL, '#fbb64b'),
  ('bento', ':bento:', '🍱', '&#1F371', 'Add or update assets.', 'patch', '#ff5864'),
  ('bookmark', ':bookmark:', '🔖', '&#x1f516;', 'Release / Version tags.', NULL, '#80deea'),
  ('boom', ':boom:', '💥', '&#x1f4a5;', 'Introduce breaking changes.', 'major', '#f94f28'),
  ('bricks', ':bricks:', '🧱', '&#x1f9f1;', 'Infrastructure related changes.', NULL, '#ff6723'),
  ('bug', ':bug:', '🐛', '&#x1f41b;', 'Fix a bug.', 'patch', '#8cd842'),
  ('building-construction', ':building_construction:', '🏗️', '&#1f3d7;', 'Make architectural changes.', NULL, '#ffe55f'),
  ('bulb', ':bulb:', '💡', '&#128161;', 'Add or update comments in source code.', NULL, '#ffce49'),
  ('busts-in-silhouette', ':busts_in_silhouette:', '👥', '&#128101;', 'Add or update contributor(s).', NULL, '#ffce49'),
  ('camera-flash', ':camera_flash:', '📸', '&#128248;', 'Add or update snapshots.', NULL, '#00a9f0'),
  ('card-file-box', ':card_file_box:', '🗃️', '&#128451;', 'Perform database related changes.', 'patch', '#c5e763'),
  ('chart-with-upwards-trend', ':chart_with_upwards_trend:', '📈', '&#x1F4C8;', 'Add or update analytics or track code.', 'patch', '#cedae6'),
  ('children-crossing', ':children_crossing:', '🚸', '&#128696;', 'Improve user experience / usability.', 'patch', '#ffce49'),
  ('closed-lock-with-key', ':closed_lock_with_key:', '🔐', '&#x1f510;', 'Add or update secrets.', NULL, '#83beec'),
  ('clown-face', ':clown_face:', '🤡', '&#129313;', 'Mock things.', NULL, '#ff7281'),
  ('coffin', ':coffin:', '⚰️', '&#x26B0;', 'Remove dead code.', NULL, '#d9e3e8'),
  ('construction', ':construction:', '🚧', '&#x1f6a7;', 'Work in progress.', NULL, '#ffb74d'),
  ('construction-worker', ':construction_worker:', '👷', '&#x1f477;', 'Add or update CI build system.', NULL, '#64b5f6'),
  ('egg', ':egg:', '🥚', '&#129370;', 'Add or update an easter egg.', 'patch', '#77e856'),
  ('fire', ':fire:', '🔥', '&#x1f525;', 'Remove code or files.', NULL, '#ff9d44'),
  ('globe-with-meridians', ':globe_with_meridians:', '🌐', '&#127760;', 'Internationalization and localization.', 'patch', '#e7f4ff'),
  ('goal-net', ':goal_net:', '🥅', '&#x1F945;', 'Catch errors.', 'patch', '#c7cb12'),
  ('green-heart', ':green_heart:', '💚', '&#x1f49a;', 'Fix CI Build.', NULL, '#c5e763'),
  ('hammer', ':hammer:', '🔨', '&#128296;', 'Add or update development scripts.', NULL, '#ffc400'),
  ('heavy-minus-sign', ':heavy_minus_sign:', '➖', '&#10134;', 'Remove a dependency.', 'patch', '#ef5350'),
  ('heavy-plus-sign', ':heavy_plus_sign:', '➕', '&#10133;', 'Add a dependency.', 'patch', '#00e676'),
  ('iphone', ':iphone:', '📱', '&#128241;', 'Work on responsive design.', 'patch', '#40c4ff'),
  ('label', ':label:', '🏷️', '&#127991;', 'Add or update types.', 'patch', '#cb63e6'),
  ('lipstick', ':lipstick:', '💄', '&#ff99cc;', 'Add or update the UI and style files.', 'patch', '#80deea'),
  ('lock', ':lock:', '🔒️', '&#x1f512;', 'Fix security issues.', 'patch', '#ffce49'),
  ('loud-sound', ':loud_sound:', '🔊', '&#128266;', 'Add or update logs.', NULL, '#23b4d2'),
  ('mag', ':mag:', '🔍️', '&#128269;', 'Improve SEO.', 'patch', '#ffe55f'),
  ('memo', ':memo:', '📝', '&#x1f4dd;', 'Add or update documentation.', NULL, '#00e676'),
  ('money-with-wings', ':money_with_wings:', '💸', '&#x1F4B8;', 'Add sponsorships or money related infrastructure.', NULL, '#b3c0b1'),
  ('monocle-face', ':monocle_face:', '🧐', '&#x1F9D0;', 'Data exploration/inspection.', NULL, '#ffe55f'),
  ('mute', ':mute:', '🔇', '&#128263;', 'Remove logs.', NULL, '#e6ebef'),
  ('necktie', ':necktie:', '👔', '&#128084;', 'Add or update business logic', 'patch', '#83beec'),
  ('package', ':package:', '📦️', '&#1F4E6;', 'Add or update compiled files or packages.', 'patch', '#fdd0ae'),
  ('page-facing-up', ':page_facing_up:', '📄', '&#1F4C4;', 'Add or update license.', NULL, '#d9e3e8'),
  ('passport-control', ':passport_control:', '🛂', '&#x1F6C2;', 'Work on code related to authorization, roles and permissions.', 'patch', '#4dc6dc'),
  ('pencil2', ':pencil2:', '✏️', '&#59161;', 'Fix typos.', 'patch', '#ffce49'),
  ('poop', ':poop:', '💩', '&#58613;', 'Write bad code that needs to be improved.', NULL, '#a78674'),
  ('pushpin', ':pushpin:', '📌', '&#x1F4CC;', 'Pin dependencies to specific versions.', 'patch', '#39c2f1'),
  ('recycle', ':recycle:', '♻️', '&#x2672;', 'Refactor code.', NULL, '#77e856'),
  ('rewind', ':rewind:', '⏪️', '&#9194;', 'Revert changes.', 'patch', '#56d1d8'),
  ('rocket', ':rocket:', '🚀', '&#x1f680;', 'Deploy stuff.', NULL, '#00a9f0'),
  ('rotating-light', ':rotating_light:', '🚨', '&#x1f6a8;', 'Fix compiler / linter warnings.', NULL, '#536dfe'),
  ('see-no-evil', ':see_no_evil:', '🙈', '&#8bdfe7;', 'Add or update a .gitignore file.', NULL, '#8bdfe7'),
  ('seedling', ':seedling:', '🌱', '&#127793;', 'Add or update seed files.', NULL, '#c5e763'),
  ('sparkles', ':sparkles:', '✨', '&#x2728;', 'Introduce new features.', 'minor', '#ffe55f'),
  ('speech-balloon', ':speech_balloon:', '💬', '&#128172;', 'Add or update text and literals.', 'patch', '#cedae6'),
  ('stethoscope', ':stethoscope:', '🩺', '&#x1FA7A;', 'Add or update healthcheck.', NULL, '#77e856'),
  ('tada', ':tada:', '🎉', '&#127881;', 'Begin a project.', NULL, '#f74d5f'),
  ('technologist', ':technologist:', '🧑‍💻', '&#129489;&#8205;&#128187;', 'Improve developer experience', NULL, '#86B837'),
  ('test-tube', ':test_tube:', '🧪', '&#x1F9EA;', 'Add a failing test.', NULL, '#fb584a'),
  ('triangular-flag-on-post', ':triangular_flag_on_post:', '🚩', '&#x1F6A9;', 'Add, update, or remove feature flags.', 'patch', '#ffce49'),
  ('truck', ':truck:', '🚚', '&#1F69A;', 'Move or rename resources (e.g.: files, paths, routes).', NULL, '#ef584a'),
  ('twisted-rightwards-arrows', ':twisted_rightwards_arrows:', '🔀', '&#128256;', 'Merge branches.', NULL, '#56d1d8'),
  ('wastebasket', ':wastebasket:', '🗑️', '&#x1F5D1;', 'Deprecate code that needs to be cleaned up.', 'patch', '#d9e3e8'),
  ('wheelchair', ':wheelchair:', '♿️', '&#9855;', 'Improve accessibility.', 'patch', '#00b1fb'),
  ('white-check-mark', ':white_check_mark:', '✅', '&#x2705;', 'Add, update, or pass tests.', NULL, '#77e856'),
  ('wrench', ':wrench:', '🔧', '&#x1f527;', 'Add or update configuration files.', 'patch', '#ffc400'),
  ('zap', ':zap:', '⚡️', '&#x26a1;', 'Improve performance.', 'patch', '#40c4ff');

COMMIT;
SET UNIQUE_CHECKS=1;
SET FOREIGN_KEY_CHECKS=1;
