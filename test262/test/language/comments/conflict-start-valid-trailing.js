// Copyright (C) 2020 Mike Pennisi authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-comments
description: Conflict comment "start" with optional comment characters
info: |
    MultiLineComment::
      /* MultiLineCommentCharsopt *\/
      <<<<<<< MultLineCommentCharsopt =======

    SingleLineComment::
      // SingleLineCommentCharsopt
      >>>>>>> SingleLineCommentCharsopt
---*/

<<<<<<< HEAD
an honest mistake
=======
