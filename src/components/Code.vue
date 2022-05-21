<template>
  <figure
    class="DevelopersCodeEditor theme--Dark"
    :class="{
      codeEditorEditing,
      editingTerminal,
      runningTerminal,
      executionFinished,
    }"
  >
    <div class="AnimatedCodeEditor">
      <div class="Card Card--shadowXLarge">
        <div
          class="CodeEditor CodeEditor--hasStatusBar CodeEditor--initialized"
          aria-hidden="true"
          style="--codeEditorLineNumbersWidth: 38px"
        >
          <code class="CodeEditor__scrollContainer editorTexts">
            <pre
              class="CodeSyntax CodeEditor__editor"
            ><div class="CodeEditorLineNumbers" >
  <div class="CodeEditorLineNumbers__lineNumbersContainer" 
    ><span class="CodeEditorLineNumbers__number" 
      v-for="(line, lineIndex) in lines" :key="lineIndex"
      >{{line}}</span
    ></div
  ></div
><span class="CodeEditorAsciiLoader"></span><span class="CodeEditor__typingArea"><span class="" 
 ><span :class="'token '+tag.contentType" 
    v-for="(tag, tagId) in codeEditorCodeTags" :key="tagId"
  >{{tag.isParent?tag.currentContent[0]:tag.currentContent||''}}<br v-if="tag.contentType=='return'"
    /><span 
        v-if="tag.isParent"
      ><span :class="'token '+subTag.contentType" 
          v-for="(subTag, subTagId) in tag.children" :key="subTagId"
        >{{subTag.isParent?subTag.currentContent[0]:subTag.currentContent}}<br v-if="subTag.contentType=='return'"
          /><span 
            v-if="subTag.isParent"
          ><span :class="'token '+subSubTag.contentType" 
              v-for="(subSubTag, subSubTagId) in subTag.children" :key="subSubTagId"
            >{{subSubTag.currentContent}}<br v-if="subSubTag.contentType=='return'"
          /></span
        ></span
      >{{subTag.isParent?subTag.currentContent[1]:''}}</span
    ></span
  >{{tag.isParent?tag.currentContent[1]:''}}</span
><span class="CodeEditorCursor" :style="{left: 'calc(var(--codeEditorSingleCharWidth)* '+editorCursorPosition+'px)'}"></span
><div class="CodeEditorAutocomplete" :class="{'CodeEditorAutocomplete--visible':autocompletVisible}" 
  :style="{left: 'calc(var(--codeEditorSingleCharWidth)* '+editorCursorPosition+'px)'}"
  ><ul class="CodeEditorAutocomplete__list" :style="{transform: 'translateY(-'+(autocompletHighlightIndex>3?autocompletHighlightIndex-3:0)*22+'px)'}"
    ><span 
      v-for="(string, stringIndex) in autocompleteStrings" :key="stringIndex"
      class="CodeEditorAutocomplete__listItem" :class="{'CodeEditorAutocomplete__listItem--highlighted':autocompletHighlightIndex==stringIndex}"
      v-html="string"></span
    ></ul
></div>
</span></span></pre>
          </code>

          <div class="CodeEditorStatusBar">
            <div class="CodeEditorStatusBar__left">
              <div class="CodeEditorStatusBar__editingMode">
                {{
                  codeEditorEditing || editingTerminal
                    ? "EDITING . . ."
                    : runningTerminal
                    ? "EXECUTING . . ."
                    : executionFinished
                    ? "FINISHED"
                    : "WAITING . . ."
                }}
              </div>
              <div class="CodeEditorStatusBar__prompt">
                <span>server.js</span>
              </div>
            </div>

            <div class="CodeEditorStatusBar__right">
              <div class="CodeEditorStatusBar__downProgress">
                {{ "" }}
              </div>
              <div class="CodeEditorStatusBar__lineIcon">☰</div>
              <div class="CodeEditorStatusBar__lineProgress">ln</div>
              <div class="CodeEditorStatusBar__ln">
                {{ totalAddedLines }}/{{ totalAddedLines }}
              </div>
              <div class="CodeEditorStatusBar__lineColon">{{ "" }}</div>
              <div class="CodeEditorStatusBar__currentColumn">
                {{ "" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="CodeTerminal CodeTerminal--focused" aria-hidden="true">
      <div
        class="HorizontalOverflowContainer"
        style="--horizontalOverflowSpacing: 16px"
      >
        <div class="HorizontalOverflowContainer__track">
          <div class="HorizontalOverflowContainer__items">
            <code class="consoleTexts">
              <pre
                class="CodeSyntax CodeTerminal__buffer"
              ><span class="CodeTerminal__buffer" 
><span :class="tag.contentType" 
      v-for="(tag, tagId) in terminalCodeTags" :key="tagId"
    >{{tag.currentContent}}<br v-if="tag.contentType=='return'"
  /></span
><span class="CodeTerminal__cursor"></span></span></pre>
            </code>
          </div>
        </div>
      </div>
    </div>
  </figure>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Code",
  components: {},
  data() {
    return {
      editorSequences: [
        [
          "SET_SLEEP",
          {
            number: 200,
          },
        ],
        [
          "SET_EDIT_MODE",
          {
            string: "insert",
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 150,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "const momo = require",
            strings: [
              {
                type: "keyword",
                value: "const ",
              },
              {
                type: "var",
                value: "momo ",
              },
              {
                type: "operator",
                value: "=",
              },
              {
                type: "function",
                value: " require",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "INSERT_COMBO",
          {
            string: "()",
            strings: [
              {
                type: "ponctuation",
                value: "()",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "INSERT_COMBO",
          {
            string: "''",
            strings: [
              {
                type: "string",
                value: "''",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 250,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "chipd",
            strings: [
              {
                type: "string",
                value: "chipd",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: ["Chipdeals-momo-api"],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ],
        [
          "PASTE",
          {
            string: "eals-momo-api",
            strings: [
              {
                type: "string",
                value: "eals-momo-api",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "SET_CURSOR_POSITION",
          {
            column: 1,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_CURSOR_POSITION",
          {
            column: 1,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "INSERT_SINGLE_CHAR",
          {
            string: ";",
            strings: [
              {
                type: "string",
                value: ";",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "momo.",
            strings: [
              {
                type: "var",
                value: "momo",
              },
              {
                type: "ponctuation",
                value: ".",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: [
              "setApiKey",
              "pay",
              "collect",
              "amount",
              "currency",
              "from",
              "create",
              "log",
            ],
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 200,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ],
        [
          "PASTE",
          {
            string: "setApiKey",
            strings: [
              {
                type: "function",
                value: "setApiKey",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "INSERT_COMBO",
          {
            string: "()",
            strings: [
              {
                type: "ponctuation",
                value: "()",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: [
              "setApiKey(<b><u>apiKey: string</u></b>): ChipdealsMomoApi",
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "INSERT_COMBO",
          {
            string: "''",
            strings: [
              {
                type: "string",
                value: "''",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 550,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ],
        [
          "PASTE",
          {
            string: "test_FOdigzgSopV8GZggZa89",
            strings: [
              {
                type: "string",
                value: "test_FOdigzgSopV8GZggZa89",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 200,
          },
        ],
        [
          "SET_CURSOR_POSITION",
          {
            column: 1,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_CURSOR_POSITION",
          {
            column: 1,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "INSERT_SINGLE_CHAR",
          {
            string: ";",
            strings: [
              {
                type: "string",
                value: ";",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "momo",
            strings: [
              {
                type: "var",
                value: "momo",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INCREASE_INDENT", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: ".",
            strings: [
              {
                type: "ponctuation",
                value: ".",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: [
              "setApiKey",
              "pay",
              "collect",
              "amount",
              "currency",
              "from",
              "create",
              "log",
            ],
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "SET_AUTO_COMPLETE_HIGHLIGHTED_INDEX",
          {
            number: 2,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 450,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ],
        [
          "PASTE",
          {
            string: "collect",
            strings: [
              {
                type: "function",
                value: "collect",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "INSERT_COMBO",
          {
            string: "()",
            strings: [
              {
                type: "ponctuation",
                value: "()",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: ["collect(): ChipdealsMomoApi"],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_CURSOR_POSITION",
          {
            column: 1,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INCREASE_INDENT", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: ".",
            strings: [
              {
                type: "ponctuation",
                value: ".",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: [
              "setApiKey",
              "pay",
              "collect",
              "amount",
              "currency",
              "from",
              "create",
              "log",
            ],
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "SET_AUTO_COMPLETE_HIGHLIGHTED_INDEX",
          {
            number: 3,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 450,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ],
        [
          "PASTE",
          {
            string: "amount",
            strings: [
              {
                type: "function",
                value: "amount",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "INSERT_COMBO",
          {
            string: "()",
            strings: [
              {
                type: "ponctuation",
                value: "()",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: ["amount(<b><u>amount: number</u></b>): ChipdealsMomoApi"],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "2000",
            strings: [
              {
                type: "number",
                value: "2000",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_CURSOR_POSITION",
          {
            column: 1,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ] /**********************************************************/,
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INCREASE_INDENT", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: ".",
            strings: [
              {
                type: "ponctuation",
                value: ".",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: [
              "setApiKey",
              "pay",
              "collect",
              "amount",
              "currency",
              "from",
              "create",
              "log",
            ],
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "SET_AUTO_COMPLETE_HIGHLIGHTED_INDEX",
          {
            number: 4,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 450,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ],
        [
          "PASTE",
          {
            string: "currency",
            strings: [
              {
                type: "function",
                value: "currency",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "INSERT_COMBO",
          {
            string: "()",
            strings: [
              {
                type: "ponctuation",
                value: "()",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: [
              "currency(<b><u>currency: string</u></b>): ChipdealsMomoApi",
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "INSERT_COMBO",
          {
            string: "''",
            strings: [
              {
                type: "string",
                value: "''",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "XOF",
            strings: [
              {
                type: "string",
                value: "XOF",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_CURSOR_POSITION",
          {
            column: 1,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_CURSOR_POSITION",
          {
            column: 1,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ] /**********************************************************/,
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INCREASE_INDENT", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: ".",
            strings: [
              {
                type: "ponctuation",
                value: ".",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: [
              "setApiKey",
              "pay",
              "collect",
              "amount",
              "currency",
              "from",
              "create",
              "log",
            ],
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "SET_AUTO_COMPLETE_HIGHLIGHTED_INDEX",
          {
            number: 5,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 450,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ],
        [
          "PASTE",
          {
            string: "from",
            strings: [
              {
                type: "function",
                value: "from",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "INSERT_COMBO",
          {
            string: "()",
            strings: [
              {
                type: "ponctuation",
                value: "()",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: [
              "currency(<b><u>currency: string</u></b>): ChipdealsMomoApi",
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "INSERT_COMBO",
          {
            string: "''",
            strings: [
              {
                type: "string",
                value: "''",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "229",
            strings: [
              {
                type: "string",
                value: "229",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "5",
            strings: [
              {
                type: "string",
                value: "5",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "1",
            strings: [
              {
                type: "string",
                value: "1",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "0",
            strings: [
              {
                type: "string",
                value: "0",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "1",
            strings: [
              {
                type: "string",
                value: "1",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "0",
            strings: [
              {
                type: "string",
                value: "0",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "1",
            strings: [
              {
                type: "string",
                value: "1",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "8",
            strings: [
              {
                type: "string",
                value: "8",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: "1",
            strings: [
              {
                type: "string",
                value: "1",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_CURSOR_POSITION",
          {
            column: 1,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_CURSOR_POSITION",
          {
            column: 1,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ] /**********************************************************/,
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        ["INCREASE_INDENT", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            string: ".",
            strings: [
              {
                type: "ponctuation",
                value: ".",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: [
              "setApiKey",
              "pay",
              "collect",
              "amount",
              "currency",
              "from",
              "create",
              "log",
            ],
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "SET_AUTO_COMPLETE_HIGHLIGHTED_INDEX",
          {
            number: 6,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 450,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ],
        [
          "PASTE",
          {
            string: "create",
            strings: [
              {
                type: "function",
                value: "create",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "INSERT_COMBO",
          {
            string: "()",
            strings: [
              {
                type: "ponctuation",
                value: "()",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_AUTO_COMPLETE_SUGGESTIONS",
          {
            strings: [
              "create(): ChipdealsMomoApiResponse",
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: true,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "SET_CURSOR_POSITION",
          {
            column: 1,
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 50,
          },
        ],
        [
          "SET_AUTO_COMPLETE_VISIBLE",
          {
            boolean: false,
          },
        ] /**********************************************************/,
        [
          "INSERT_SINGLE_CHAR",
          {
            string: ";",
            strings: [
              {
                type: "ponctuation",
                value: ";",
              },
            ],
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 200,
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 200,
          },
        ],
        [
          "SET_EDIT_MODE",
          {
            string: "normal",
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "SET_FOCUSED",
          {
            boolean: false,
          },
        ],
      ],
      terminalSequences: [
        [
          "SET_SLEEP",
          {
            number: 200,
          },
        ],
        [
          "SET_EDIT_MODE",
          {
            string: "insert",
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 150,
          },
        ],
        [
          "INSERT_MULTIPLE_CHARS",
          {
            strings: [
              {
                type: "CodeTerminal__promptSign",
                value: "$ ",
              },
              {
                type: "var",
                value: "node server.js ",
              },
            ],
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_EDIT_MODE",
          {
            string: "runningTerminal",
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 2000,
          },
        ],
        [
          "PASTE",
          {
            strings: [
              {
                type: "CodeTerminal__bufferPiece CodeTerminal__bufferPiece--meta",
                value: "currentDate",
              },
              {
                type: "string",
                value: " [",
              },
              {
                type: "CodeTerminal__bufferPiece CodeTerminal__bufferPiece--highlighted",
                value: "201",
              },
              {
                type: "string",
                value: "] collect request created",
              },
            ],
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 800,
          },
        ],
        [
          "PASTE",
          {
            strings: [
              {
                type: "CodeTerminal__bufferPiece CodeTerminal__bufferPiece--meta",
                value: "currentDate",
              },
              {
                type: "string",
                value: " [",
              },
              {
                type: "CodeTerminal__bufferPiece CodeTerminal__bufferPiece--highlighted",
                value: "204",
              },
              {
                type: "string",
                value: "] waiting for customer validation...",
              },
            ],
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 1500,
          },
        ],
        [
          "PASTE",
          {
            strings: [
              {
                type: "CodeTerminal__bufferPiece CodeTerminal__bufferPiece--meta",
                value: "currentDate",
              },
              {
                type: "string",
                value: " [",
              },
              {
                type: "CodeTerminal__bufferPiece CodeTerminal__bufferPiece--highlighted",
                value: "200",
              },
              {
                type: "string",
                value: "] customer confirmed payment",
              },
            ],
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 100,
          },
        ],
        [
          "PASTE",
          {
            strings: [
              {
                type: "CodeTerminal__bufferPiece CodeTerminal__bufferPiece--meta",
                value: "currentDate",
              },
              {
                type: "string",
                value: " [",
              },
              {
                type: "CodeTerminal__bufferPiece CodeTerminal__bufferPiece--highlighted",
                value: "OK",
              },
              {
                type: "string",
                value: "] 2000 XOF received from user.",
              },
            ],
          },
        ],
        ["INSERT_NEW_LINE", {}],
        [
          "SET_SLEEP",
          {
            number: 800,
          },
        ],
        [
          "SET_EDIT_MODE",
          {
            string: "finish",
          },
        ],
        [
          "SET_SLEEP",
          {
            number: 400,
          },
        ],
        [
          "SET_FOCUSED",
          {
            boolean: false,
          },
        ],
      ],
      codeEditorEditing: false,
      runningTerminal: false,
      editingTerminal: false,
      executionFinished: false,
      lines: ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~", "~", "~", "~"],
      totalAddedLines: 0,
      editorCursorPosition: 0,
      autocompleteStrings: [],
      autocompletHighlightIndex: 0,
      autocompletVisible: false,
      codeEditorCodeTags: [],
      terminalCodeTags: [],
    };
  },
  mounted() {
    this.writeEditorCode();
  },
  methods: {
    initializeDevCode() {
      this.lines = [
        "~",
        "~",
        "~",
        "~",
        "~",
        "~",
        "~",
        "~",
        "~",
        "~",
        "~",
        "~",
        "~",
      ];
      this.totalAddedLines = 0;
      this.editorCursorPosition = 0;
      this.autocompletVisible = false;
      this.codeEditorEditing = false;
      this.runningTerminal = false;
      this.editingTerminal = false;
      this.executionFinished = false;
      this.codeEditorCodeTags = [];
      this.terminalCodeTags = [];
    },
    async writeEditorCode(commandId = 0, previousTagWasParent = false) {
      const command = this.editorSequences[commandId];
      if (!command) {
        setTimeout(() => {
          this.addTerminalCodeLine();
        }, 500);
        return;
      }
      this.totalAddedLines = this.totalAddedLines || 1;
      this.lines[this.totalAddedLines - 1] = this.totalAddedLines;
      const commandExecution = this.getEditorCommandExecution(command);
      await this.waitFor(commandExecution.timeout);

      let currentTagContainer = this.codeEditorCodeTags;
      if (!commandExecution.ignorePreviousTagParent && previousTagWasParent) {
        let parentTag =
          this.codeEditorCodeTags[this.codeEditorCodeTags.length - 1];
        if (parentTag.children[0]) parentTag = parentTag.children[0];
        currentTagContainer = parentTag.children;
      }
      if (commandExecution.tags[0]) {
        await commandExecution.tags.reduce(async (previousTagShowed, tag) => {
          await previousTagShowed;
          currentTagContainer.push(tag);
          if (
            tag.fullContent.length &&
            tag.currentContent.length !== tag.fullContent.length
          ) {
            await tag.fullContent
              .split("")
              .reduce(async (previousCharShowed, char) => {
                await previousCharShowed;
                tag.currentContent += char;
                currentTagContainer.push({});
                await this.waitFor(50);
                return "previousCharShowed";
              }, Promise.resolve("previousCharShowed"));
          }
          return "previousTagShowed";
        }, Promise.resolve("previousTagShowed"));
      }

      if (commandExecution.selectAutoComplet) {
        await new Promise((resolve) => {
          const autocompletInterval = setInterval(() => {
            if (
              commandExecution.autoCompleteIndex >
              this.autocompletHighlightIndex
            ) {
              this.autocompletHighlightIndex++;
              return;
            }
            clearInterval(autocompletInterval);
            resolve();
          }, 120);
        });
      }

      this.writeEditorCode(
        commandId + 1,
        commandExecution.ignorePreviousTagParent
          ? commandExecution.isParentTag
          : previousTagWasParent || commandExecution.isParentTag
      );
    },
    getEditorCommandExecution(command) {
      const commandExecution = {
        tags: [],
        timeout: 0,
        isParentTag: false,
        ignorePreviousTagParent: false,
        selectAutoComplet: false,
        autoCompleteIndex: 0,
      };
      switch (command[0]) {
        case "SET_SLEEP":
          (() => {
            commandExecution.timeout = command[1].number;
          })();
          break;
        case "SET_EDIT_MODE":
          (() => {
            if (command[1].string == "insert") {
              this.codeEditorEditing = true;
            }
            if (command[1].string == "normal") {
              this.codeEditorEditing = false;
            }
          })();
          break;
        case "INSERT_MULTIPLE_CHARS":
          (() => {
            const tags = command[1].strings.map((string) => {
              return {
                isParent: false,
                contentType: string.type,
                fullContent: string.value,
                currentContent: "",
                children: [],
              };
            });
            commandExecution.tags = tags;
          })();
          break;
        case "INSERT_COMBO":
          (() => {
            const tags = command[1].strings.map((string) => {
              return {
                isParent: true,
                contentType: string.type,
                fullContent: string.value,
                currentContent: string.value,
                children: [],
              };
            });
            commandExecution.tags = tags;
            commandExecution.isParentTag = true;
            this.editorCursorPosition = this.editorCursorPosition - 1;
          })();
          break;
        case "SET_CURSOR_POSITION":
          (() => {
            commandExecution.ignorePreviousTagParent = true;
            this.editorCursorPosition =
              this.editorCursorPosition + command[1].column;
          })();
          break;
        case "SET_AUTO_COMPLETE_SUGGESTIONS":
          (() => {
            this.autocompleteStrings = command[1].strings;
            this.autocompletHighlightIndex = 0;
          })();
          break;
        case "SET_AUTO_COMPLETE_VISIBLE":
          (() => {
            this.autocompletVisible = command[1].boolean;
          })();
          break;
        case "PASTE":
          (() => {
            const tags = command[1].strings.map((string) => {
              return {
                isParent: false,
                contentType: string.type,
                fullContent: string.value,
                currentContent: string.value,
                children: [],
              };
            });
            commandExecution.tags = tags;
          })();
          break;
        case "INSERT_SINGLE_CHAR":
          (() => {
            const tags = command[1].strings.map((string) => {
              return {
                isParent: false,
                contentType: string.type,
                fullContent: string.value,
                currentContent: "",
                children: [],
              };
            });
            commandExecution.tags = tags;
          })();
          break;
        case "SET_AUTO_COMPLETE_HIGHLIGHTED_INDEX":
          (() => {
            (commandExecution.selectAutoComplet = true),
              (commandExecution.autoCompleteIndex = command[1].number);
          })();
          break;
        case "SET_FOCUSED":
          (() => {})();
          break;
        case "INSERT_NEW_LINE":
          (() => {
            commandExecution.tags = [
              {
                isParent: false,
                contentType: "return",
                fullContent: "",
                currentContent: "",
                children: [],
              },
            ];
            this.totalAddedLines++;
          })();
          break;
        case "INCREASE_INDENT":
          (() => {
            commandExecution.tags = [
              {
                isParent: false,
                contentType: "indent",
                fullContent: "  ",
                currentContent: "  ",
                children: [],
              },
            ];
          })();
          break;
        default:
          (() => {
            console.log("command ", command[0], " not found");
          })();
      }
      return commandExecution;
    },
    async addTerminalCodeLine(commandId = 0) {
      const command = this.terminalSequences[commandId];
      if (!command) {
        setTimeout(() => {
          this.initializeDevCode();
          // this.addTerminalCodeLine();
          this.writeEditorCode();
        }, 5000);
        return;
      }
      const commandExecution = this.getTerminalCommandExecution(command);
      await this.waitFor(commandExecution.timeout);

      const currentTagContainer = this.terminalCodeTags;
      if (commandExecution.tags[0]) {
        await commandExecution.tags.reduce(async (previousTagShowed, tag) => {
          await previousTagShowed;
          currentTagContainer.push(tag);
          if (
            tag.fullContent.length &&
            tag.currentContent.length !== tag.fullContent.length
          ) {
            await tag.fullContent
              .split("")
              .reduce(async (previousCharShowed, char) => {
                await previousCharShowed;
                tag.currentContent += char;
                currentTagContainer.push({});
                await this.waitFor(50);
                return "previousCharShowed";
              }, Promise.resolve("previousCharShowed"));
          }
          return "previousTagShowed";
        }, Promise.resolve("previousTagShowed"));
      }

      this.addTerminalCodeLine(commandId + 1);
    },
    getTerminalCommandExecution(command) {
      const commandExecution = {
        tags: [],
        timeout: 0,
      };
      switch (command[0]) {
        case "SET_SLEEP":
          (() => {
            commandExecution.timeout = command[1].number;
          })();
          break;
        case "SET_EDIT_MODE":
          (() => {
            if (command[1].string == "insert") {
              this.editingTerminal = true;
              this.runningTerminal = false;
            }
            if (command[1].string == "runningTerminal") {
              this.editingTerminal = false;
              this.runningTerminal = true;
            }
            if (command[1].string == "finish") {
              this.runningTerminal = false;
              this.editingTerminal = false;
              this.executionFinished = true;
            }
          })();
          break;
        case "INSERT_MULTIPLE_CHARS":
          (() => {
            const tags = command[1].strings.map((string) => {
              return {
                contentType: string.type,
                fullContent: string.value,
                currentContent: "",
              };
            });
            commandExecution.tags = tags;
          })();
          break;
        case "PASTE":
          (() => {
            const tags = command[1].strings.map((string) => {
              let value = string.value;
              if (value == "currentDate") {
                const date = new Date();
                value = "";
                value += date.getFullYear() + "-";
                value +=
                  ("0" + (date.getMonth() + 1)).replace(/.+(.{2})$/, "$1") +
                  "-";
                value +=
                  ("0" + date.getDate()).replace(/.+(.{2})$/, "$1") + " ";
                value +=
                  ("0" + date.getHours()).replace(/.+(.{2})$/, "$1") + ":";
                value +=
                  ("0" + date.getMinutes()).replace(/.+(.{2})$/, "$1") + ":";
                value += ("0" + date.getSeconds()).replace(/.+(.{2})$/, "$1");
              }
              return {
                contentType: string.type,
                fullContent: value,
                currentContent: value,
              };
            });
            commandExecution.tags = tags;
          })();
          break;
        case "SET_FOCUSED":
          (() => {})();
          break;
        case "INSERT_NEW_LINE":
          (() => {
            commandExecution.tags = [
              {
                contentType: "return",
                fullContent: "",
                currentContent: "",
              },
            ];
          })();
          break;
        default:
          (() => {
            console.log("command ", command[0], " not found");
          })();
      }
      return commandExecution;
    },
    async waitFor(duration) {
      return new Promise((resolve) => {
        setTimeout(resolve, duration);
      });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&family=Source+Code+Pro:wght@500&display=swap');

.editorTexts, .editorTexts *{
  font-family: 'Fira Code', monospace!important;
}
.consoleTexts, .consoleTexts *{
font-family: 'Source Code Pro', monospace!important;
}


.theme--Dark{--backgroundColor:#0a2540;--linkColor:var(--accentColor);--linkHoverColor:#fff;--linkHoverOpacity:1;--buttonColor:var(--accentColor);--buttonHoverColor:#fff;--buttonDisabledColor:#6b7c93;--buttonHoverOpacity:1;--buttonDisabledOpacity:0.7;--knockoutColor:#0a2540;--knockoutDisabledColor:#e6ebf1;--guideSolidColor:rgba(66,71,112,0.3);--guideDashedColor:rgba(66,71,112,0.3);--titleColor:#fff;--textColor:#adbdcc;--inputBackground:#0c2e4e;--inputBackgroundAlt:#274869;--inputPlaceholderColor:#b6c2cd;--inputTextColor:#fff;--inputErrorAccentColor:#ff5191;--annotationColor:#8c9eb1;--maskFadeColor:rgba(0,0,0,0.4);--navColor:#fff;--navHoverColor:#fff;--navHoverOpacity:0.6;--footerColor:#fff;--cardBorderColor:#0f395e;--cardBackground:#0c2e4e;--subcardBackground:#1f4468;--gridSubcardBackground:#1f4468;--tableIconColor:#8c9eb1;--stripeAccentWhite:#fff;--stripeAccentLight:#fff;--stripeAccentDark:#0c2e4e;--bulletColor:#6b7c93;--footnoteTextColor:#adbdcc;--disclaimerTextColor:#707f98;--inlineCodeTextColor:#fff;--inlineCodeBackground:#1c4161;--socialLogoColor:#707f98;--socialLogoHoverColor:#fff}.theme--Dark.accent--Slate,.theme--Dark .accent--Slate{--accentColor:#fff}

.DevelopersCodeEditor {
  min-width: 0;
  }
.DevelopersCodeEditor .AnimatedCodeEditor .Card {
  border-radius:8px;
  overflow: hidden;
  background:var(--cardBackground);
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.DevelopersCodeEditor .CodeEditor {
  --codeEditorVisibleNumberOfLines: 13;
  z-index: 2;
}
.DevelopersCodeEditor .CodeTerminal {
  --codeTerminalHeight: 280px;
  z-index: 1;
  margin-top: -10px;
  padding-top: 22px;
  font-size: 14px;
}
.CodeEditor {
  --codeEditorBaseColor: #55718d;
  --codeEditorHorizontalPadding: 20px;
  --codeEditorVerticalPadding: 16px;
  --codeEditorCursorBackgroundColor: red;
  --codeEditorLineSpacing: 21px ;
  --codeEditorSingleCharWidth: 7.81;
  --codeEditorLineNumbersWidth: 0px;
  --codeEditorVisibleNumberOfLines: 8;
  --codeEditorTotalHeight: calc(
    var(--codeEditorVisibleNumberOfLines) * var(--codeEditorLineSpacing) +
      var(--codeEditorVerticalPadding) * 2 + var(--statusBarHeight) +
      var(--fileTabsBarHeight)
  );
  --codeEditorAccentColor: #8095ff;
  --codeEditorAccentColorAlternate: #ffd96a;
  --statusBarHeight: 0px;
  --fileTabsBarHeight: 0px;
  -webkit-text-size-adjust: 100%;
  position: relative;
  height: var(--codeEditorTotalHeight);
  min-height: 240px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
.CodeEditor code,
.CodeEditor pre {
  display: flex;
  font: inherit;
  color: var(--codeEditorBaseColor);
  height: 100%;
      overflow-y: hidden
}
.CodeEditor ::-moz-selection {
  background: rgba(15, 57, 94, 0.99);
}
.CodeEditor ::selection {
  background: rgba(15, 57, 94, 0.99);
}
.CodeEditor .CodeEditorCursor {
  display: none;
}
.CodeEditor--autosize {
  height: auto;
}
.CodeEditor--hasStatusBar {
  --statusBarHeight: 25px;
}
.CodeEditor--hasFilesTabBar {
  --fileTabsBarHeight: 25px;
}
.theme--Dark .CodeEditor {
  --codeEditorBaseColor: #fff;
  --codeEditorCursorBackgroundColor: #fff;
}
.theme--Dark .CodeEditor .hljs-comment {
  color: #55718d;
}
.CodeEditor__scrollContainer {
  width: 100%;
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  position: relative;
  align-items: center;
  -webkit-mask-image: linear-gradient(
    90deg,
    #000,
    #000 var(--codeEditorLineNumbersWidth),
    transparent var(--codeEditorLineNumbersWidth),
    #000
      calc(
        var(--codeEditorLineNumbersWidth) + var(--codeEditorHorizontalPadding)
      ),
    #000 calc(100% - var(--codeEditorHorizontalPadding)),
    transparent
  );
  mask-image: linear-gradient(
    90deg,
    #000,
    #000 var(--codeEditorLineNumbersWidth),
    transparent var(--codeEditorLineNumbersWidth),
    #000
      calc(
        var(--codeEditorLineNumbersWidth) + var(--codeEditorHorizontalPadding)
      ),
    #000 calc(100% - var(--codeEditorHorizontalPadding)),
    transparent
  );
}
.CodeEditor__scrollContainer::-webkit-scrollbar {
  display: none;
}
.CodeEditor__editor {
  align-items: flex-start;
}
.CodeEditor__highlightedLine {
  width: 100%;
  position: absolute;
  height: var(--codeEditorLineSpacing);
  top: calc(
    var(--codeEditorVerticalPadding) +
      (var(--codeEditorHighlightedLineNumber) - 1) *
      var(--codeEditorLineSpacing)
  );
  left: 0;
  background-color: #0e3f69;
}
.CodeEditor:not(.CodeEditor--initialized) .CodeEditor__highlightedLine {
  display: none;
}
.CodeEditor__typingArea {
  display: table;
  position: relative;
  padding: var(--codeEditorVerticalPadding) var(--codeEditorHorizontalPadding);
}
.CodeEditor--initialized .CodeEditorAsciiLoader {
  display: none;
}
.CodeEditor--initialized .CodeEditorCursor {
  display: inline;
}
.CodeEditor__footer {
  --titleAnchorDisplay: none;
  position: relative;
  padding: 16px 0 8px;
}
.CodeEditor__footer:before {
  position: absolute;
  top: 0;
  left: var(--columnPaddingNormal);
  right: var(--columnPaddingNormal);
  height: 1px;
  background-color: var(--cardBorderColor);
  content: "";
}

.CodeEditorLineNumbers {
  position: relative;
  height: 100%;
  display: flex;
  background-color: var(--cardBackground);
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
}
.CodeEditorLineNumbers__number {
  padding: 0 6px;
}
.CodeEditorLineNumbers__lineNumbersContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 38px;
  text-align: right;
  color: #55718d;
  z-index: 1;
  padding: var(--codeEditorVerticalPadding) 0;
  min-height: 100%;
  user-select: none;
}

.CodeEditorCursor{position:absolute;width:calc(var(--codeEditorSingleCharWidth)*1px);height:16px;border:1px solid var(--codeEditorBaseColor);top:calc(var(--codeEditorVerticalPadding) + 4px);left:var(--codeEditorHorizontalPadding)}.CodeEditor--insertMode .CodeEditorCursor{width:2px}.CodeEditor--focused .CodeEditorCursor{background-color:var(--codeEditorBaseColor);border:none}

.CodeEditorCursor{
    position: relative;
    left:0;
    top: 0;
    height: 18px;
    vertical-align: top;
    border-color: white;
    border-width:1px;
    display: inline-block!important;
}

.codeEditorEditing .CodeEditorCursor{
    border-color: transparent transparent transparent white;
}



.CodeEditorAutocomplete{--horizontalPadding:8px;--autocompleteBackgroundColor:#194369;--autocompleteHighlightColor:#265784;display:none;position:absolute;width:auto;height:auto;max-height:110px;background-color:var(--autocompleteBackgroundColor);overflow:hidden;border-radius:3px}.CodeEditorAutocomplete--visible{display:flex}.CodeEditorAutocomplete__list{padding:0;margin:0;position:relative;display:flex;flex-direction:column}.CodeEditorAutocomplete__listItem{padding:6px var(--horizontalPadding) 8px;line-height:8px}.CodeEditorAutocomplete__listItem--highlighted{background-color:var(--autocompleteHighlightColor)}.CodeEditorAutocomplete__listItem:hover{background-color:var(--autocompleteHighlightColor)}

.CodeEditorAutocomplete{
     position: relative;
    top: 16px;
    left: 0;
    display: none;
    vertical-align: top;
    user-select: none;
}
.CodeEditorAutocomplete--visible{
  display: inline-block
}


.CodeEditorStatusBar {
  --statusBarAccentColor: var(--codeEditorAccentColor);
  --statusBarAltAccentColor: var(--codeEditorAccentColorAlternate);
  --statusBarBackgroundColor: #0a2540;
  --statusBarTextColor: #55718d;
  --statusBarPaddingSmall: 4px;
  --statusBarPaddingLarge: 8px;
  display: flex;
  height: var(--statusBarHeight);
  justify-content: space-between;
  background-color: var(--statusBarBackgroundColor);
  color: var(--statusBarTextColor);
  margin-top: auto;
  width: 100%;
}
.CodeEditor--insertMode .CodeEditorStatusBar {
  --statusBarAccentColor: var(--statusBarAltAccentColor);
}
@media (min-width: 600px) {
  .CodeEditorStatusBar {
    --statusBarPaddingSmall: 8px;
    --statusBarPaddingLarge: 16px;
  }
}
.CodeEditorStatusBar__left,
.CodeEditorStatusBar__right {
  display: flex;
  align-items: stretch;
}
.CodeEditorStatusBar__editingMode {
  --editingModeArrowWidth: 9px;
  background-color: var(--statusBarAccentColor);
  color: #06182c;
  text-transform: uppercase;
  padding: 0 5px 0 var(--editingModeArrowWidth);
  margin: 0 var(--editingModeArrowWidth) 0 0;
  position: relative;
}
.codeEditorEditing .CodeEditorStatusBar__editingMode {
  --statusBarAccentColor: #ffd96a;
}
.runningTerminal .CodeEditorStatusBar__editingMode {
  --statusBarAccentColor: #b2493e;
}
.executionFinished .CodeEditorStatusBar__editingMode {
  --statusBarAccentColor: #797b86;
}
.CodeEditorStatusBar__editingMode:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  width: 0;
  height: 0;
  border-left: var(--editingModeArrowWidth) solid var(--statusBarAccentColor);
  border-bottom: calc(var(--statusBarHeight) / 2) solid transparent;
  border-right: 0 solid transparent;
  border-top: calc(var(--statusBarHeight) / 2) solid transparent;
}
.CodeEditorStatusBar__prompt {
  color: var(--statusBarAccentColor);
  margin: 0 0 0 8px;
}
@media (min-width: 600px) {
  .CodeEditorStatusBar__prompt {
    margin: 0 0 0 10px;
  }
}
.CodeEditorStatusBar__currentColumn,
.CodeEditorStatusBar__lineColon,
.CodeEditorStatusBar__ln {
  padding: 0 var(--statusBarPaddingLarge) 0 0;
}
.CodeEditorStatusBar__lineProgress {
  padding: 0 var(--statusBarPaddingSmall) 0 0;
}
.CodeEditorStatusBar__lineIcon {
  padding: 0 var(--statusBarPaddingLarge) 0 0;
}
.CodeEditorStatusBar__downProgress {
  padding: 0 var(--statusBarPaddingSmall) 0 0;
}

.CodeSyntax {
  font: inherit;
}
.CodeSyntax .token.keyword {
  color: #8095ff;
}
.CodeSyntax .token.tag {
  color: #ff333d;
}
.CodeSyntax .token.string {
  color: #ffa956;
}
.CodeSyntax .token.function {
  color: #00d4ff;
}
.CodeSyntax .token.number {
  color: #ffd96a;
}
.CodeSyntax .token.comment {
  color: #a9bcce;
}
.CodeSyntax .token.property {
  color: #1abdc0;
}
.CodeSyntax .token.class-name {
  color: #00d924;
}

.HorizontalOverflowContainer {
  --trackHeight: auto;
  --maskSpacing: 16px;
  display: flex;
  align-items: center;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 var(--maskSpacing),
    #000 calc(100% - var(--maskSpacing)),
    transparent
  );
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 var(--maskSpacing),
    #000 calc(100% - var(--maskSpacing)),
    transparent
  );
}
.HorizontalOverflowContainer__track {
  display: flex;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  height: var(--trackHeight);
  scrollbar-width: none;
}
.HorizontalOverflowContainer__track::-webkit-scrollbar {
  display: none;
}
.HorizontalOverflowContainer__items {
  display: flex;
  position: relative;
  padding: 0 var(--horizontalOverflowSpacing, 20px);
}

.CodeTerminal {
  --codeTerminalBackgroundColor: #06182c;
  --codeTerminalBaseColor: #fff;
  --codeTerminalMetaColor: #55718d;
  --codeTerminalHighlightColor: #00d4ff;
  --codeTerminalPromptColor: #8095ff;
  --codeTerminalBorderRadius: 8px;
  --codeTerminalBorderColor: #0f395e;
  --codeTerminalHeight: 200px;
  --codeTerminalLineHeight: 24px;
  --codeTerminalCursorHeight: 16px;
  --codeTerminalSingleCharWidth: 8.411764706;
  position: relative;
  height: var(--codeTerminalHeight);
  border-radius: var(--codeTerminalBorderRadius);
  border: 1px solid var(--codeTerminalBorderColor);
  background-color: var(--codeTerminalBackgroundColor);
  color: var(--codeTerminalBaseColor);
  padding: 16px 0;
  font: var(--sourceCodeFont);
  user-select: none;
}
.CodeTerminal code {
  display: block;
}
.CodeTerminal code,
.CodeTerminal pre {
  font: inherit;
  color: var(--codeTerminalBaseColor);
}
.CodeTerminal__buffer {
  flex-direction: row;

}
.CodeTerminal__buffer,
.CodeTerminal__bufferLineItem {
  position: relative;
  display: inline-block;
}
.CodeTerminal__promptSign {
  color: var(--codeTerminalPromptColor);
  margin-right: calc(var(--codeTerminalSingleCharWidth) * 1px);
}
.CodeTerminal__cursor {
  width: calc(var(--codeTerminalSingleCharWidth) * 1px);
  height: var(--codeTerminalCursorHeight);
  border: 1px solid var(--codeTerminalBaseColor);
  position: relative;
  top: calc(
    var(--codeTerminalLineHeight) / 2 - var(--codeTerminalCursorHeight) / 2
  );
  left: calc(var(--codeTerminalSingleCharWidth) * 1px * 2);
}

 .CodeTerminal__cursor {
    border: solid;
    border-width: 1px;
    left: 0;
    top: 0;
    vertical-align: top;
    display: inline-block;
    height: 18px;
    background-color: transparent;
}
 .editingTerminal .CodeTerminal__cursor,
.runningTerminal .CodeTerminal__cursor,
.executionFinished .CodeTerminal__cursor {
    background-color: var(--codeTerminalBaseColor);
}
.CodeTerminal__bufferPiece--meta {
  color: var(--codeTerminalMetaColor);
}
.CodeTerminal__bufferPiece--highlighted {
  color: var(--codeTerminalHighlightColor);
}



.DevelopersCodeEditor ::-webkit-scrollbar-thumb {
  background: var(--color6);
}
.DevelopersCodeEditor ::-webkit-scrollbar-thumb:active {
  background: var(--color6);
}

.DevelopersCodeEditor ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}



.DevelopersCodeEditor ::-webkit-scrollbar-track,
.DevelopersCodeEditor ::-webkit-scrollbar-thumb {
  border-radius: 4px;
}

.DevelopersCodeEditor ::-webkit-scrollbar-track {
  background: transparent
}

  @media screen and (max-width: 993px) {
.DevelopersCodeEditor ::-webkit-scrollbar-track {
  background: transparent;
}
.DevelopersCodeEditor ::-webkit-scrollbar-thumb {
  background: transparent;
}
.DevelopersCodeEditor ::-webkit-scrollbar-thumb:active {
  background: transparent;
}
}
</style>
