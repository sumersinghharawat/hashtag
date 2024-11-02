<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #FCF7ED;
            margin: 0;
            padding: 0;
            color: #333333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #52B596;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
        }
        .content h2 {
            color: #52B596;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f4f4f4;
            color: #777777;
            font-size: 12px;
        }
        .button {
            background-color: #52B596;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 4px;
            display: inline-block;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Email Header -->
        <div class="header">
            <h1>{{ $title }}</h1>
        </div>

        <!-- Email Body Content -->
        <div class="content">
            <h2>{!! $subtitle  !!}</h2>
            <p>
                {!! $description !!}
            </p>
            @if ($link && $button_text)
                <a href="{{ $link }}" class="button">{{ $button_text }}</a>
            @endif
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>
                {!! $support_description !!}
            </p>
            <p>
                {!! $footer !!}
            </p>
        </div>
    </div>
</body>
</html>
